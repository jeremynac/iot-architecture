// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:math';
import 'package:front_light_sensor/constants/urls.dart';
import 'package:front_light_sensor/models/mqtt_rpc_response_model.dart';
import 'package:front_light_sensor/types/rpc_method.dart';
import 'package:mobx/mobx.dart';
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

/* Store Mqtt */

/* 

Don't forget to replace "part 'mqtt_store.g.dart';"" with "part 'yourfile_store.g.dart';""
And run the command "flutter packages pub run build_runner build --delete-conflicting-outputs"
to generate the .g.dart file.

*/

part 'mqtt_store.g.dart';

class MqttStore = _MqttStore with _$MqttStore;

abstract class _MqttStore with Store {
  // final TeamStore _teamStore = TeamStore();
  final serverAddress = "127.0.0.1"; //192.168.1.97";
  final port = 1883;
  final Map<String, Map<String, double>> devicesLocations = {
    "Device1": {"latitude": 48.864718, "longitude": 2.349014},
    "Device2": {"latitude": 48.864716, "longitude": 2.349014},
    "Device3": {"latitude": 48.864714, "longitude": 2.349014}
  };
  final Map<String, String> devices = {
    "Device1": "DzV8P2RnMtmW9KMF0z2A",
    "Device2": "FpkOPclmYan2SOZgVGoV",
    "Device3": "kC2bqgpbPuAmxleJLxfk"
  };

  late final MqttServerClient client;
  // constructor:---------------------------------------------------------------
  _MqttStore() {
    // setting up disposers
    client =
        MqttServerClient.withPort(serverAddress, '00000000000000000000', port);
    _setupDisposers();
  }

  // disposers:-----------------------------------------------------------------
  late List<ReactionDisposer> _disposers;

  void _setupDisposers() {
    _disposers = [
      // reaction((_) => createteam != null, (_) => isRetreived = true),
    ];
  }
  // store variables:-----------------------------------------------------------

  @observable
  bool isLoading = false;

  @observable
  bool isError = false;

  @observable
  bool isClientConnected = false;

  @observable
  bool isUpdatingIntensity = false;

  @observable
  bool isUpdatingStatus = false;

  @computed
  String? get currentToken => devices[currentlySelectedDeviceKey];

  @observable
  String currentlySelectedDeviceKey = "Device1";

  @observable
  int currentDeviceIndex = 0;

  @observable
  ObservableMap<String, double> intensityByDeviceKey =
      ObservableMap.of({"Device1": 20, "Device2": 20, "Device3": 20});

  @observable
  ObservableMap<String, bool> statusByDeviceKey =
      ObservableMap.of({"Device1": true, "Device2": true, "Device3": true});

  @computed
  double get intensity => intensityByDeviceKey[currentlySelectedDeviceKey] ?? 0;

  @computed
  bool get status => statusByDeviceKey[currentlySelectedDeviceKey] ?? false;

  // actions:-------------------------------------------------------------------

  @action
  initialize() async {
    isLoading = false;
    isError = false;
    isClientConnected = false;
    isUpdatingIntensity = false;
    isUpdatingStatus = false;
    await connectToServer();
    getValuesFromServer();
  }

  @action
  changeDevice(int index) async {
    if (devices.entries.length > index) {
      currentDeviceIndex = index;
      MapEntry<String, String> device = devices.entries.elementAt(index);
      currentlySelectedDeviceKey = device.key;
      client.unsubscribe(ThingsBoardUrls.topicRPCsub);
      client.disconnect();
      await connectToServer();
      getValuesFromServer();
    }
  }

  @action
  updateIntensity(double value) {
    intensityByDeviceKey[currentlySelectedDeviceKey] = value;
  }

  @action
  updateStatus(bool value) {
    statusByDeviceKey[currentlySelectedDeviceKey] = value;
  }

  @action
  sendRandomValidData() async {
    isLoading = true;
    List<String> randomStatus = ["true", "false"];
    Random random = Random();
    int index = random.nextInt(2);
    int randomIntensity = random.nextInt(101);
    double randomLatitude = random.nextInt(180) - 90;
    double randomLongitude = random.nextInt(360) - 180;
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      await connectToServer();
    }
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      return;
    }
    String dataToSend =
        '{"active": ${randomStatus[index]}, "intensity": ${randomIntensity.toString()}, "longitude": $randomLongitude, "latitude": $randomLatitude}';
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(dataToSend);
    client.publishMessage(
        ThingsBoardUrls.topicSend, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully send random valid data =====> $dataToSend');
    isLoading = false;
  }

  @action
  sendRandomInvalidData() async {
    isLoading = true;

    List<String> randomStatus = ["true", "false", "otherValue", "wrongValue", "tru", "fals"];
    Random random = Random();
    int index = random.nextInt(6);
    int randomIntensity = random.nextInt(10000) - 5000;
    double randomLongitude = random.nextDouble();
    double randomLatitude = random.nextDouble();
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      await connectToServer();
    }
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      return;
    }
    client.subscribe(ThingsBoardUrls.topicSend, MqttQos.atMostOnce);
    print('Subscribe to ${ThingsBoardUrls.topicSend} topic');
    String dataToSend =
        '{"status": ${randomStatus[index].toString()}, "intensity": $randomIntensity, "longitude": $randomLongitude, "latitude": $randomLatitude}';
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(dataToSend);
    client.publishMessage(
        ThingsBoardUrls.topicSend, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully send random invalid data =====> $dataToSend');
    isLoading = false;
  }

  @action
  updateServerStatus(bool mode) async {
    isLoading = true;
    isUpdatingStatus = true;
    statusByDeviceKey[currentlySelectedDeviceKey] = mode;
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      await connectToServer();
    }
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      isUpdatingStatus = false;
      return;
    }
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(
        '{"status": $mode, "intensity": $intensity, "longitude": ${devicesLocations[currentlySelectedDeviceKey]?["longitude"]}, "latitude": ${devicesLocations[currentlySelectedDeviceKey]?["latitude"]}}');
    client.publishMessage(
        ThingsBoardUrls.topicSend, MqttQos.exactlyOnce, builderActive.payload!);
    print('Successfully update light active mode on thingsboard');
    isLoading = false;
    isUpdatingStatus = false;
  }

  @action
  updateServerIntensity(double newIntensity) async {
    isLoading = true;
    isUpdatingIntensity = true;
    intensityByDeviceKey[currentlySelectedDeviceKey] = newIntensity;
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      await connectToServer();
    }
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      isUpdatingIntensity = false;
      return;
    }
    print('Subscribe to ${ThingsBoardUrls.topicSend} topic');
    final builderIntensity = MqttClientPayloadBuilder();
    builderIntensity.addString(
        '{"status": ${status.toString()}, "intensity": ${newIntensity.toString()}, "longitude": ${devicesLocations[currentlySelectedDeviceKey]?["longitude"]}, "latitude": ${devicesLocations[currentlySelectedDeviceKey]?["latitude"]}}');
    client.publishMessage(ThingsBoardUrls.topicSend, MqttQos.exactlyOnce,
        builderIntensity.payload!);
    print('Succesfully update light intensity on thingsboard');
    isLoading = false;
    isUpdatingIntensity = false;
  }

  @action
  getValuesFromServer() async {
    client.logging(on: false);
    client.keepAlivePeriod = 60;
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      await connectToServer();
    }
    if (!isClientConnected ||
        client.connectionStatus?.state != MqttConnectionState.connected) {
      return;
    }
    client.subscribe(ThingsBoardUrls.topicRPCsub, MqttQos.atMostOnce);
    print('Subscribe to ${ThingsBoardUrls.topicRPCsub} topic');
    client.published?.listen((MqttPublishMessage message) {
      // print(message.payload);
    });
    client.updates?.listen((List<MqttReceivedMessage<MqttMessage?>>? messages) {
      final message = messages?[0];
      final payload = messages?[0].payload as MqttPublishMessage;
      final parsedPayload =
          MqttPublishPayload.bytesToStringAsString(payload.payload.message);
      final requestId =
          message?.topic.substring(ThingsBoardUrls.topicRPCid.length);
      if (requestId != null) {
        final json = jsonDecode(parsedPayload);
        final parsedMessage = MqttRpcResponse.fromJson(json);
        print(parsedMessage.toJson());
        if (parsedMessage.method == RpcMethod.getStatus) {
          processGetStatus(requestId);
        } else if (parsedMessage.method == RpcMethod.getIntensity) {
          processGetIntensity(requestId);
        } else if (parsedMessage.method == RpcMethod.setIntensity) {
          processSetIntensity(parsedMessage);
        } else if (parsedMessage.method == RpcMethod.setStatus) {
          processSetStatus(parsedMessage);
        }
      }
    }, onError: (e) {
      print("Error");
    }, onDone: () {
      print("Done");
    });
  }

  // general methods:-----------------------------------------------------------

  processGetStatus(String requestId) {
    print('getStatus from server');
    final builderActive = MqttClientPayloadBuilder();
    builderActive.addString(status.toString());
    client.publishMessage(ThingsBoardUrls.topicRPCsend + requestId,
        MqttQos.exactlyOnce, builderActive.payload!);
    print(
        'Successfully send light active mode : ${status.toString()} on thingsboard dashboard');
  }

  processGetIntensity(String requestId) {
    final builderIntensity = MqttClientPayloadBuilder();
    builderIntensity.addString(intensity.toInt().toString());
    if (builderIntensity.payload != null) {
      client.publishMessage(ThingsBoardUrls.topicRPCsend + requestId,
          MqttQos.exactlyOnce, builderIntensity.payload!);
    }
    print(
        "Succesfully send light intensity : $intensity  on thingsboard dashboard${ThingsBoardUrls.topicRPCsend + requestId}");
  }

  processSetStatus(MqttRpcResponse mqttRpcResponse) {
    if (mqttRpcResponse.parameters == true) {
      statusByDeviceKey[currentlySelectedDeviceKey] = true;
    }
    if (mqttRpcResponse.parameters == false) {
      statusByDeviceKey[currentlySelectedDeviceKey] = false;
    }
  }

  processSetIntensity(MqttRpcResponse mqttRpcResponse) {
    num newIntensity;
    if (mqttRpcResponse.parameters is String) {
      newIntensity = int.tryParse(mqttRpcResponse.parameters) ??
          double.tryParse(mqttRpcResponse.parameters) ??
          intensity;
    } else if (mqttRpcResponse.parameters is double ||
        mqttRpcResponse.parameters is int) {
      newIntensity = mqttRpcResponse.parameters;
    } else {
      return;
    }
    intensityByDeviceKey[currentlySelectedDeviceKey] = newIntensity.toDouble();
  }

  connectToServer() async {
    final connMessage = MqttConnectMessage()
        .authenticateAs(currentToken, '')
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
      isLoading = false;
      isClientConnected = false;
      return;
    }
    isClientConnected = true;
  }

  void dispose() {
    for (final d in _disposers) {
      d();
    }
  }
}
