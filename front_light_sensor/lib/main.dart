// ignore_for_file: avoid_print
//import 'package:mqtt_client/mqtt_browser_client.dart';
import 'dart:async';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:front_light_sensor/store/mqtt_store.dart';
import 'package:flutter/material.dart';

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
  late final MqttStore _mqttStore;

  @override
  void didChangeDependencies() {
    _mqttStore = MqttStore();
    _mqttStore.initialize();
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return Observer(
        builder: (_) => Scaffold(
            bottomNavigationBar: _buildBottomBar(context),
            appBar: AppBar(
              title: Text(
                  "Light sensor setup: ${_mqttStore.currentlySelectedDeviceKey}"),
              backgroundColor:
                  _mqttStore.currentlySelectedDeviceKey == "Device1"
                      ? Colors.red
                      : _mqttStore.currentlySelectedDeviceKey == "Device2"
                          ? Colors.green
                          : Colors.blue,
            ),
            body: ListView(
              children: <Widget>[
                Center(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: <Widget>[
                      _buildStatusButton(context),
                      _buildIntensityButton(context),
                      _buildLightIndicator(context),
                      const SizedBox(
                        height: 20,
                      ),
                      randomSendValidData(),
                      randomSendInvalidData(),
                      stopSendRandomData()
                    ]))
              ],
            )));
  }

  Widget _buildBottomBar(BuildContext context) {
    return BottomNavigationBar(
      items: {
        for (MapEntry<String, String> device in _mqttStore.devices.entries)
          _buildBottomBarItem(context, device)
      }.toList(),
      onTap: _mqttStore.changeDevice,
      selectedLabelStyle: TextStyle(
        color: _mqttStore.currentlySelectedDeviceKey == "Device1"
            ? Colors.red
            : _mqttStore.currentlySelectedDeviceKey == "Device2"
                ? Colors.green
                : Colors.blue,
      ),
      currentIndex: _mqttStore.currentDeviceIndex,
    );
  }

  BottomNavigationBarItem _buildBottomBarItem(
    BuildContext context,
    MapEntry<String, String> device,
  ) {
    return BottomNavigationBarItem(
      icon: Icon(
        Icons.lightbulb,
        color: _mqttStore.currentlySelectedDeviceKey != device.key
            ? Colors.grey
            : device.key == "Device1"
                ? Colors.red
                : device.key == "Device2"
                    ? Colors.green
                    : Colors.blue,
      ),
      label: device.key,
    );
  }

  Widget _buildLightIndicator(BuildContext context) {
    return Container(
      child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            const Text('Light status :'),
            Observer(
                builder: (_) => Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.black),
                          color: modifyColorIntensity(
                              _mqttStore.status, _mqttStore.intensity)),
                    )),
            Observer(
                builder: (_) => Text(
                    'Intensity : ${_mqttStore.intensity.round().toString()}'))
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
    );
  }

  Widget _buildIntensityButton(BuildContext context) {
    return Container(
      child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Light intensity :'),
            Observer(
                builder: (_) => Slider(
                      value: _mqttStore.intensity,
                      min: 0,
                      max: 100,
                      divisions: 100,
                      label: _mqttStore.intensity.round().toString(),
                      onChanged: (double value) {
                        _mqttStore.updateIntensity(value);
                      },
                      onChangeEnd: (double value) {
                        _mqttStore.updateServerIntensity(value);
                      },
                    ))
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
    );
  }

  Widget _buildStatusButton(BuildContext context) {
    return Container(
      child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Power ON / OFF the light :'),
            Observer(
                builder: (_) => Switch(
                      value: _mqttStore.status,
                      onChanged: _mqttStore.updateServerStatus,
                      activeTrackColor: Colors.yellow,
                      activeColor: Colors.orangeAccent,
                    ))
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
    );
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
          timer = Timer.periodic(const Duration(seconds: 10),
              (Timer t) => _mqttStore.sendRandomValidData());
        },
        child: const Text('valid data'));
  }

  Widget randomSendInvalidData() {
    return TextButton(
        onPressed: () {
          timer = Timer.periodic(const Duration(seconds: 10),
              (Timer t) => _mqttStore.sendRandomInvalidData());
        },
        child: const Text('invalid data'));
  }

  Widget stopSendRandomData() {
    return TextButton(
        onPressed: () {
          if (timer!.isActive) {
            timer!.cancel();
            print('Timer stopped');
          }
        },
        child: const Text('Stop send random data'));
  }
}
