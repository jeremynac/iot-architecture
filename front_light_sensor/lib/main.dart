// ignore_for_file: avoid_print
//import 'package:mqtt_client/mqtt_browser_client.dart';
import 'dart:async';
import 'globals.dart' as globals;

import 'package:front_light_sensor/mqtt.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:flutter/material.dart';
import 'package:mqtt_client/mqtt_server_client.dart';
import 'package:awesome_dropdown/awesome_dropdown.dart';

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
  Timer? timer;
  int state = 0;
  MyMqttUse mqtt = MyMqttUse();
  MqttServerClient client =
      MqttServerClient.withPort('192.168.1.97', 'test', 1883);

  bool isSwitched = false;
  final bool _isPanDown = false;
  bool _isDropDownOpened = false;
  late bool _isBackPressedOrTouchedOutSide;
  Color off = Colors.white;
  var on = Colors.yellow;
  var topic = 'v1/devices/me/telemetry';
  @override
  void initState() {
    // TODO: implement initState
    //mqtt.connectAppToServ(client, mqtt.access_token);
    if (globals.token != '') {
      mqtt.getValuesFromServer(client, globals.token,
          globals.intensity.round().toString(), globals.status, context);
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    //double _currentSliderValue = globals.intensity;
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
                  AwesomeDropDown(
                    isPanDown: _isPanDown,
                    dropDownList: globals.allDevices,
                    dropDownIcon: const Icon(
                      Icons.arrow_drop_down,
                      color: Colors.grey,
                      size: 23,
                    ),
                    selectedItem: globals.allDevices[0],
                    onDropDownItemClick: (selectedItem) {
                      globals.token = selectedItem;
                      print(globals.token);
                    },
                    dropStateChanged: (isOpened) {
                      _isDropDownOpened = isOpened;
                      if (!isOpened) {
                        _isBackPressedOrTouchedOutSide = false;
                      }
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Text('Power ON / OFF the light :'),
                          Switch(
                            value: globals.status,
                            onChanged: (value) async {
                              setState(() {
                                globals.status = value;

                                if (globals.status == false) {
                                  print('OFF');
                                }

                                if (globals.status == true) {
                                  print('ON');
                                }
                                // ignore: unrelated_type_equality_checks
                              });
                              mqtt.updateActiveMode(
                                  client,
                                  topic,
                                  globals.status.toString(),
                                  globals.token,
                                  globals.intensity.toString());
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
                            value: globals.intensity,
                            min: 0,
                            max: 100,
                            divisions: 100,
                            label: globals.intensity.round().toString(),
                            onChanged: (double value) {
                              setState(() {
                                globals.intensity = value;
                                print(globals.intensity);
                              });
                              mqtt.updateIntensity(
                                  client,
                                  topic,
                                  globals.intensity.round().toString(),
                                  globals.token,
                                  globals.status.toString());
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
                                    globals.status, globals.intensity)),
                          ),
                          Text(
                              'Intensity : ${globals.intensity.round().toString()}')
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
                  randomSendValidData(),
                  randomSendInvalidData()
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

  Widget randomSendValidData() {
    return TextButton(
        onPressed: () {
          timer = Timer.periodic(
              const Duration(seconds: 10),
              (Timer t) => mqtt.sendRandomValidData(
                  client, mqtt.topicSend, mqtt.access_token));
        },
        child: const Text('valid data'));
  }

  Widget randomSendInvalidData() {
    return TextButton(
        onPressed: () {
          timer = Timer.periodic(
              const Duration(seconds: 10),
              (Timer t) => mqtt.sendRandomInvalidData(
                  client, mqtt.topicSend, mqtt.access_token));
        },
        child: const Text('invalid data'));
  }
}
