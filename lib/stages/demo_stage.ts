import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

import {EC2CreationStack} from '../stacks/ec2_creation_stack/ec2_creation_stack';
import { VPCStack } from '../stacks/vpc_stack/vpc_stack';
import { EC2InteractionStack } from '../stacks/ec2_interaction_stack/ec2_interaction_stack';


export class DemoStage extends cdk.Stage {
  public readonly EC2instanceref: ec2.Instance;
    
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
        
      const VPCStackVar = new VPCStack(this, 'mydemovpc');
      const VPCref = VPCStackVar.demovpc;

      const EC2CreationStackVar = new EC2CreationStack(this, 'mydemoec2',VPCref);
      const EC2instanceref = EC2CreationStackVar.ec2Instance
      const EC2InteractionStackVar = new EC2InteractionStack(this, 'mydemoint',EC2instanceref);


    }
}