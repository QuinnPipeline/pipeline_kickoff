#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineKickoffStack } from '../lib/pipeline_kickoff-stack';

const app = new cdk.App();
new PipelineKickoffStack(app, 'MyPipelineKickoff', {

  //your env variables
  // env: { account: '2XXXXXXXXXX2', region: 'us-east-1' },
});

app.synth();