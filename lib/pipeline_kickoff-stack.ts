import * as cdk from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';

import { DemoStage } from './stages/demo_stage';
import { DevToolsStage } from './stages/dev_tools_stage';

export class PipelineKickoffStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //add github-token secret to your destination account
    const pipeline_name = 'JabilPipelineExample'
    const git_source = 'QuinnPipeline/jabilexample'

    const pipeline = new CodePipeline(this, 'JabilPipeline', {
      pipelineName: pipeline_name,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub(git_source, 'main', {
        authentication: cdk.SecretValue.secretsManager('github-token'),
        }),
        commands: [
        'npm install -g npm',
        'npm ci', 
        'npm run build', 
        'npx cdk synth'
        ],
        // primaryOutputDirectory: 'cdk.out',
      })
    });
    const infrastructure = new DemoStage(this, "FirstDeployment", {
      env: { account: '275332436206', region: "us-east-1" }
    });
    const dev_stage = pipeline.addStage(infrastructure);

    const EC2instanceref = infrastructure.EC2instanceref
    
    const Dev_tools = new DevToolsStage(this, "DevTools", {
      env: { account: '275332436206', region: "us-east-1" }
    });
    const dev_tools_stage = pipeline.addStage(Dev_tools)

  }
}