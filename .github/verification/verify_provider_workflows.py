"""Verify runtime-only maintenance preserves provider, writer and authority gates."""
import copy,json,pathlib,yaml
root=pathlib.Path(__file__).resolve().parents[2]
baseline=json.loads((root/'.github/verification/provider-workflow-baseline.json').read_text())
versions={'actions/checkout': 'v7.0.1', 'actions/setup-python': 'v7.0.0', 'actions/setup-node': 'v7.0.0', 'actions/upload-artifact': 'v7.0.1', 'pnpm/action-setup': 'v6.1.0'}
verified=[]
for name,expected in baseline.items():
    actual=yaml.load((root/name).read_text(),Loader=yaml.BaseLoader)
    for job in actual['jobs'].values():
        for step in job.get('steps',[]):
            if 'uses' not in step: continue
            action,version=step['uses'].split('@',1)
            if action in versions:
                assert version==versions[action], (name,step['uses'])
                step['uses']=action+'@BASELINE'
            if action=='actions/upload-artifact':
                assert step['with'].pop('archive')=='true'
            if action=='actions/setup-node' and name.endswith('/translate.yml'):
                assert step['with'].pop('package-manager-cache')=='false'
    for job in expected['jobs'].values():
        for step in job.get('steps',[]):
            if 'uses' in step:
                action=step['uses'].split('@',1)[0]
                if action in versions: step['uses']=action+'@BASELINE'
    if name.endswith(('chatgpt-239-crosswalk.yml','fusion-overnight-chatgpt-phases.yml')):
        paths=expected['on']['pull_request']['paths']
        paths.remove(name)
        assert actual['on']['pull_request']['paths']==paths
        assert 'workflow_dispatch' in actual['on']
    assert actual==expected, 'Unexpected command/trigger/permission/provider-gate change: '+name
    verified.append(name)
receipt={'verified_workflows':verified,'scope':'action runtimes and preserved workflow contracts; no provider call, evidence regeneration, runtime deployment or disabled-workflow execution'}
print(json.dumps(receipt,indent=2))
(root/'provider-workflow-compatibility.json').write_text(json.dumps(receipt,indent=2)+'\n')
