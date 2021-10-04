import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

export class VPCStack extends cdk.Stack {

    public readonly demovpc: ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.demovpc = new ec2.Vpc(this, "DemoVpc", {
        cidr: '10.0.0.0/16',
        // natGateways: 0,
        maxAzs: 1,
        subnetConfiguration: [
            {
                cidrMask: 24,

                name: 'PubSubnet',
                subnetType: ec2.SubnetType.PUBLIC,
            },
            {
                cidrMask: 24,
                name: 'PriSubnet',
                subnetType: ec2.SubnetType.PRIVATE,
            }
        ]
    });
  }
}