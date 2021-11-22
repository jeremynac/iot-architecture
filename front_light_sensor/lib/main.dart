// ignore_for_file: avoid_print
//import 'package:mqtt_client/mqtt_browser_client.dart';
import 'dart:async';

import 'package:front_light_sensor/mqtt.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:flutter/material.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'iot_architecture',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Timer timer;
  int state = 0;
  MyMqttUse mqtt = MyMqttUse();
  MqttServerClient client =
      MqttServerClient.withPort('192.168.1.97', 'test', 1883);

  bool isSwitched = false;
  double _currentSliderValue = 20;
  Color off = Colors.white;
  var on = Colors.yellow;
  var topic = 'v1/devices/me/telemetry';
  @override
  void initState() {
    // TODO: implement initState
    //mqtt.connectAppToServ(client, mqtt.access_token);

    // timer = Timer.periodic(
    //     const Duration(seconds: 10),
    //     (Timer t) => mqtt.getValuesFromServer(client, mqtt.access_token,
    //         _currentSliderValue.round().toString(), isSwitched.toString()));
    //connect(topic, client);
    super.initState();
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    mqtt.getValuesFromServer(client, mqtt.access_token,
        _currentSliderValue.round().toString(), isSwitched);
    return Scaffold(
        appBar: AppBar(
          title: const Text('Light sensor setup'),
        ),
        body: ListView(
          children: <Widget>[
            Center(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                  Container(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Text('Power ON / OFF the light :'),
                          Switch(
                            value: isSwitched,
                            onChanged: (value) async {
                              setState(() {
                                isSwitched = value;

                                if (isSwitched == false) {
                                  print('OFF');
                                }

                                if (isSwitched == true) {
                                  print('ON');
                                }
                                // ignore: unrelated_type_equality_checks
                              });
                              mqtt.updateActiveMode(client, topic,
                                  isSwitched.toString(), mqtt.access_token);
                            },
                            activeTrackColor: Colors.yellow,
                            activeColor: Colors.orangeAccent,
                          )
                        ]),
                    height: 200,
                    width: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      border: Border.all(
                        color: Colors.black,
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                  ),
                  Container(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Text('Light intensity :'),
                          Slider(
                            value: _currentSliderValue,
                            min: 0,
                            max: 100,
                            divisions: 100,
                            label: _currentSliderValue.round().toString(),
                            onChanged: (double value) {
                              setState(() {
                                _currentSliderValue = value;
                                print(_currentSliderValue);
                              });
                              mqtt.updateIntensity(
                                  client,
                                  topic,
                                  _currentSliderValue.round().toString(),
                                  mqtt.access_token);
                            },
                          )
                        ]),
                    height: 200,
                    width: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      border: Border.all(
                        color: Colors.black,
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                  ),
                  Container(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: <Widget>[
                          const Text('Light status :'),
                          Container(
                            width: 60,
                            height: 60,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(color: Colors.black),
                                color: modifyColorIntensity(
                                    isSwitched, _currentSliderValue)),
                          ),
                          Text('Intensity : ' +
                              _currentSliderValue.round().toString())
                        ]),
                    height: 200,
                    width: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      border: Border.all(
                        color: Colors.black,
                        width: 2.0,
                      ),
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                  )
                ]))
          ],
        ));
  }

  Color modifyColorIntensity(bool isOn, double intensity) {
    if (isOn == true && intensity >= 0 && intensity <= 20) {
      return Colors.yellow.shade100;
    }
    if (isOn == true && intensity >= 20 && intensity <= 40) {
      return Colors.yellow.shade200;
    }
    if (isOn == true && intensity >= 40 && intensity <= 60) {
      return Colors.yellow.shade300;
    }
    if (isOn == true && intensity >= 60 && intensity <= 80) {
      return Colors.yellow.shade400;
    }
    if (isOn == true && intensity >= 80 && intensity <= 100) {
      return Colors.yellow.shade500;
    }
    return Colors.white;
  }

  void onConnected() {
    print('Connected');
  }

// Disconnection
  void onDisconnected() {
    print('Disconnected');
  }

// Subscription to topic succeeded
  void onSubscribed(String topic) {
    print('Subscribed topic: $topic');
  }

// Failed to subscribe to topic
  void onSubscribeFail(String topic) {
    print('Failed to subscribe $topic');
  }

// Unsubscribed successfully
  void onUnsubscribed(String topic) {
    print('Unsubscribed topic: $topic');
  }

// PING response received
  void pong() {
    print('Ping response client callback invoked');
  }
}

/// Set logging on if needed, defaults to off
// Future<MqttServerClient> connect(var topic, MqttServerClient client) async {
//   client.logging(on: false);

//   final connMessage = MqttConnectMessage()
//       .authenticateAs('vkaG6Mh70dxXDXPmhtkR', '')
//       .startClean()
//       .withWillQos(MqttQos.atMostOnce);
//   print('Mosquitto client connecting....');
//   client.connectionMessage = connMessage;
//   try {
//     await client.connect();
//     if (client.connectionStatus!.state == MqttConnectionState.connected) {
//       print('Mosquitto client connected');
//     }
//     //print('connected');
//   } catch (e) {
//     print('Exception: $e');
//     client.disconnect();
//   }
//   print('EXAMPLE::Subscribing to the $topic topic');
//   client.subscribe(topic, MqttQos.atMostOnce);

//   return client;
// }
