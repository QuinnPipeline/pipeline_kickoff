import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class EmptyStack extends cdk.Stack {

    // public readonly ExportVPC: ec2.Vpc;
    //declare exports here

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Stack code goes here
  }
}