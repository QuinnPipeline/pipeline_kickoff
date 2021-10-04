import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import { EmptyStack } from '../stacks/empty_stack/empty_stack';


export class DemoStage extends cdk.Stage {
  public readonly EC2instanceref: ec2.Instance;
    
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
        
      const EmptyStackVar = new EmptyStack(this, 'EmptyStackID');

    }
}