import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import { DevServerStack } from '../stacks/dev_server_stack/dev_server_stack';
export class DevToolsStage extends cdk.Stage {
    
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
      
      const DevServerStackVar = new DevServerStack(this, 'DevServerStackID');
      
    }
}