import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export class EC2CreationStack extends cdk.Stack {

  public readonly ec2Instance: ec2.Instance;

  constructor(scope: cdk.Construct, id: string, myvpc: ec2.Vpc, props?: cdk.StackProps) {
    super(scope, id, props);

    const webserverSG = new ec2.SecurityGroup(this, 'webserver-sg', {
        vpc: myvpc,
        allowAllOutbound: true,
    });

    webserverSG.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        'allow SSH access from anywhere',
    );

  webserverSG.addIngressRule(
    ec2.Peer.anyIpv4(),
    ec2.Port.tcp(80),
    'allow HTTP traffic from anywhere',
  );

  webserverSG.addIngressRule(
    ec2.Peer.anyIpv4(),
    ec2.Port.tcp(443),
    'allow HTTPS traffic from anywhere',
  );

  // 👇 create a Role for the EC2 Instance
    const webserverRole = new iam.Role(this, 'webserver-role', {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
        ],
    });

    const machineImage = ec2.MachineImage.fromSSMParameter(
      '/aws/service/canonical/ubuntu/server/focal/stable/current/amd64/hvm/ebs-gp2/ami-id',
      ec2.OperatingSystemType.LINUX
    )

    this.ec2Instance = new ec2.Instance(this, 'ec2-instance', {
        vpc:myvpc,
        vpcSubnets: {
          subnetType: ec2.SubnetType.PUBLIC,
        },
        role: webserverRole,
        securityGroup: webserverSG,
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T2,
          ec2.InstanceSize.MICRO,
        ),
        machineImage: machineImage,
        keyName: 'ec2-cdk-demo',
      });

    }
}