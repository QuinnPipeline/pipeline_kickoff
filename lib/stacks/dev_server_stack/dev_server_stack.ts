import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import {readFileSync} from 'fs';
import * as path from 'path';

export class DevServerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myvpc = new ec2.Vpc(this, "OneVPCEC2id", {
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
    const devserverSG = new ec2.SecurityGroup(this, 'devserver-sg', {
      vpc: myvpc,
      allowAllOutbound: true,
    });

    devserverSG.addIngressRule(
        ec2.Peer.anyIpv4(),
        ec2.Port.tcp(22),
        'allow SSH access from anywhere',
    );

    devserverSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP traffic from anywhere',
    );

    devserverSG.addIngressRule(
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

    const ec2Instance = new ec2.Instance(this, 'ec2-dev-instance', {
      vpc:myvpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      role: webserverRole,
      securityGroup: devserverSG,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: machineImage,
      keyName: 'ec2-cdk-demo',
    });
    const userDataScript = readFileSync(path.resolve(__dirname, 'user-data.sh'), 'utf8');
    // 👇 add the User Data script to the Instance
    ec2Instance.addUserData(userDataScript);

  }
}
