#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineKickoffStack } from '../lib/pipeline_kickoff-stack';

const app = new cdk.App();
new PipelineKickoffStack(app, 'JabilPipelineAppExampleId', {

  //your env variables
  env: { account: '275332436206', region: 'us-east-1' },
});

app.synth();