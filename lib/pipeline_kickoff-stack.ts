import * as cdk from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from '@aws-cdk/pipelines';

import { DemoStage } from './stages/demo_stage';

export class PipelineKickoffStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //add github-token secret to your destination account
    const pipeline_name = 'Pipelinekickoffexample'
    const git_source = 'QuinnPipeline/pipeline_kickoff' // in <Username/repo> format

    const pipeline = new CodePipeline(this, 'PipelineKickoffID', {
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
      // env: { account: '2XXXXXXXXXX2', region: "us-east-1" }
    });
    const dev_stage = pipeline.addStage(infrastructure);


  }
}