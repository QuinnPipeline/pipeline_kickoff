import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { readFileSync } from 'fs';


export class EC2InteractionStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, myec2: ec2.Instance, props?: cdk.StackProps) {
    super(scope, id, props);

    const userDataScript = readFileSync('ec2_interaction_stack/user-data.sh', 'utf8');
    // 👇 add the User Data script to the Instance
    myec2.addUserData(userDataScript);


    }
}