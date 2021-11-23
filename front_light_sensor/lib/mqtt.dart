// ignore_for_file: non_constant_identifier_names, avoid_print

import 'dart:math';
import 'globals.dart' as globals;
import 'package:flutter/cupertino.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

class MyMqttUse {
  String topicSend = "v1/devices/me/telemetry";
  String topicRPCsub = "v1/devices/me/rpc/request/+";
  String topicRPCsend = "v1/devices/me/rpc/response/";
  String access_token = "vkaG6Mh70dxXDXPmhtkR";
  String serv_addr = "192.168.1.97";
  int port = 1883;
  MqttServerClient client = MqttServerClient.withPort("192.168.1.97", '', 1883);

  // void connectAppToServ(MqttServerClient client, String token) async {
  //   client.logging(on: false);
  //   client.keepAlivePeriod = 60;
  //   final connMessage = MqttConnectMessage()
  //       .authenticateAs(token, '')
  //       .startClean()
  //       .withWillQos(MqttQos.atMostOnce);
  //   print('MQTT client connecting....');
  //   client.connectionMessage = connMessage;
  //   try {
  //     await client.connect();
  //     if (client.connectionStatus.state == MqttConnectionState.connected) {
  //       print('MQTT client connected');
  //     }
  //     //print('connected');
  //   } catch (e) {
  //     print('Exception: $e');
  //     //client.disconnect();
  //   }
  // }

  void sendRandomValidData(
      MqttServerClient client, String topic, String token) async {
    List<String> randomStatus = ["true", "false"];
    Random random = Random();
    int index = random.nextInt(2);
    int randomIntensity = random.nextInt(101);
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    final connMessage = MqttConnectMessage()
        .authenticateAs(token, '')
        .startClean()
        .withWillQos(MqttQos.atMostOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMessage;
    try {
      await client.connect();
      if (client.connectionStatus!.state == MqttConnectionState.connected) {
        print('MQTT client connected');
      }
      //print('connected');
    } catch (e) {
      print('Exception: $e');
      //client.disconnect();
    }
    client.subscribe(topic, MqttQos.atMostOnce);
    print('Subscribe to $topic topic');
    String dataToSend =
        '{"active": ${randomStatus[index]}, "intensity": ${randomIntensity.toString()}}';
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(dataToSend);
    client.publishMessage(topic, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully send random valid data =====> $dataToSend');
    client.disconnect();
  }

  void sendRandomInvalidData(
      MqttServerClient client, String topic, String token) async {
    List<String> randomIntensity = ["true", "false"];
    Random random = Random();
    int index = random.nextInt(2);
    int randomStatus = random.nextInt(101);
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    final connMessage = MqttConnectMessage()
        .authenticateAs(token, '')
        .startClean()
        .withWillQos(MqttQos.atMostOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMessage;
    try {
      await client.connect();
      if (client.connectionStatus!.state == MqttConnectionState.connected) {
        print('MQTT client connected');
      }
      //print('connected');
    } catch (e) {
      print('Exception: $e');
      //client.disconnect();
    }
    client.subscribe(topic, MqttQos.atMostOnce);
    print('Subscribe to $topic topic');
    String dataToSend =
        '{"active": ${randomStatus.toString()}, "intensity": ${randomIntensity[index]}}';
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(dataToSend);
    client.publishMessage(topic, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully send random invalid data =====> $dataToSend');
    client.disconnect();
  }

  void updateActiveMode(MqttServerClient client, String topic, String mode,
      String token, String intensity) async {
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    final connMessage = MqttConnectMessage()
        .authenticateAs(token, '')
        .startClean()
        .withWillQos(MqttQos.atMostOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMessage;
    try {
      await client.connect();
      if (client.connectionStatus!.state == MqttConnectionState.connected) {
        print('MQTT client connected');
      }
      //print('connected');
    } catch (e) {
      print('Exception: $e');
      //client.disconnect();
    }
    client.subscribe(topic, MqttQos.atMostOnce);
    print('Subscribe to $topic topic');
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString('{"active": $mode, "intensity": $intensity}');
    client.publishMessage(topic, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully update light active mode on thingsboard');
    client.disconnect();
  }

  void updateIntensity(MqttServerClient client, String topic, String intensity,
      String mode, String token) async {
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    final connMessage = MqttConnectMessage()
        .authenticateAs(token, '')
        .startClean()
        .withWillQos(MqttQos.atMostOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMessage;
    try {
      await client.connect();
      if (client.connectionStatus!.state == MqttConnectionState.connected) {
        print('MQTT client connected');
      }
      //print('connected');
    } catch (e) {
      print('Exception: $e');
      //client.disconnect();
    }
    client.subscribe(topic, MqttQos.atMostOnce);
    print('Subscribe to $topic topic');
    final builderIntensity = MqttClientPayloadBuilder();
    builderIntensity.addString('{"active": $mode, "intensity": $intensity}');
    client.publishMessage(
        topic, MqttQos.exactlyOnce, builderIntensity.payload!);
    print('Succesfully update light intensity on thingsboard');
    client.disconnect();
  }

  void getValuesFromServer(MqttServerClient client, String token,
      String intensity, bool mode, BuildContext context) async {
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    final connMessage = MqttConnectMessage()
        .authenticateAs(token, '')
        .startClean()
        .withWillQos(MqttQos.atMostOnce);
    print('MQTT client connecting....');
    client.connectionMessage = connMessage;
    try {
      await client.connect();
      if (client.connectionStatus!.state == MqttConnectionState.connected) {
        print('MQTT client connected');
      }
      //print('connected');
    } catch (e) {
      print('Exception: $e');
      //client.disconnect();
    }
    client.subscribe(topicRPCsub, MqttQos.atMostOnce);
    print('Subscribe to $topicRPCsub topic');
    var pt = '';
    String id = '';
    client.published!.listen((MqttPublishMessage message) {
      print(
          'EXAMPLE::Published notification:: topic is ${message.variableHeader!.topicName}');
      if (message.variableHeader!.topicName.contains('request')) {
        id = message.variableHeader!.topicName
            .substring('v1/devices/me/rpc/request/'.length);
      }

      print('request_id == $id');
    });
    mode = true;
    client.updates!.listen((List<MqttReceivedMessage<MqttMessage?>>? c) {
      final recMess = c![0].payload as MqttPublishMessage;

      pt = MqttPublishPayload.bytesToStringAsString(recMess.payload.message);
      print(pt);
      if (pt.contains("getStatus")) {
        print('getStatus from server');
        final builderActive = MqttClientPayloadBuilder();
        builderActive.addString('{"status":"$mode"}');
        client.publishMessage(
            topicRPCsend + id, MqttQos.exactlyOnce, builderActive.payload!);
        print(
            'Successfully send light active mode : $mode on thingsboard dashboard');
        print('BUFFER : ' + builderActive.payload!.toString());
      }
      if (pt.contains("getIntensity")) {
        final builderIntensity = MqttClientPayloadBuilder();
        builderIntensity.addString(intensity);
        client.publishMessage(
            topicRPCsend + id, MqttQos.exactlyOnce, builderIntensity.payload!);
        print(
            'Succesfully send light intensity : $intensity  on thingsboard dashboard');
        print('BUFFER : ' + builderIntensity.payload!.toString());
      }
      if (pt.contains("setIntensity")) {
        String doublestr = pt.replaceAll(new RegExp(r'[^0-9]'), '');
        double newIntensity = double.parse(doublestr);
        globals.intensity = newIntensity / 100;
        print(globals.intensity.toString());
        Navigator.popAndPushNamed(context, '/');
        print('Succesfully set intensity to ${globals.intensity}');
      }
      if (pt.contains("setStatus")) {
        if (pt.contains('"params":true')) {
          globals.status = true;
        }
        if (pt.contains('"params":false')) {
          globals.status = false;
        }

        print(globals.status.toString());
        Navigator.popAndPushNamed(context, '/');
        print('Succesfully set status to ${globals.status}');
      }
    });

    //client.disconnect();
  }
}
