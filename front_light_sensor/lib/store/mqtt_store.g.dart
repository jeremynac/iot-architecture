// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mqtt_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$MqttStore on _MqttStore, Store {
  Computed<String?>? _$currentTokenComputed;

  @override
  String? get currentToken =>
      (_$currentTokenComputed ??= Computed<String?>(() => super.currentToken,
              name: '_MqttStore.currentToken'))
          .value;
  Computed<double>? _$intensityComputed;

  @override
  double get intensity => (_$intensityComputed ??=
          Computed<double>(() => super.intensity, name: '_MqttStore.intensity'))
      .value;
  Computed<bool>? _$statusComputed;

  @override
  bool get status => (_$statusComputed ??=
          Computed<bool>(() => super.status, name: '_MqttStore.status'))
      .value;

  final _$isLoadingAtom = Atom(name: '_MqttStore.isLoading');

  @override
  bool get isLoading {
    _$isLoadingAtom.reportRead();
    return super.isLoading;
  }

  @override
  set isLoading(bool value) {
    _$isLoadingAtom.reportWrite(value, super.isLoading, () {
      super.isLoading = value;
    });
  }

  final _$isErrorAtom = Atom(name: '_MqttStore.isError');

  @override
  bool get isError {
    _$isErrorAtom.reportRead();
    return super.isError;
  }

  @override
  set isError(bool value) {
    _$isErrorAtom.reportWrite(value, super.isError, () {
      super.isError = value;
    });
  }

  final _$isClientConnectedAtom = Atom(name: '_MqttStore.isClientConnected');

  @override
  bool get isClientConnected {
    _$isClientConnectedAtom.reportRead();
    return super.isClientConnected;
  }

  @override
  set isClientConnected(bool value) {
    _$isClientConnectedAtom.reportWrite(value, super.isClientConnected, () {
      super.isClientConnected = value;
    });
  }

  final _$isUpdatingIntensityAtom =
      Atom(name: '_MqttStore.isUpdatingIntensity');

  @override
  bool get isUpdatingIntensity {
    _$isUpdatingIntensityAtom.reportRead();
    return super.isUpdatingIntensity;
  }

  @override
  set isUpdatingIntensity(bool value) {
    _$isUpdatingIntensityAtom.reportWrite(value, super.isUpdatingIntensity, () {
      super.isUpdatingIntensity = value;
    });
  }

  final _$isUpdatingStatusAtom = Atom(name: '_MqttStore.isUpdatingStatus');

  @override
  bool get isUpdatingStatus {
    _$isUpdatingStatusAtom.reportRead();
    return super.isUpdatingStatus;
  }

  @override
  set isUpdatingStatus(bool value) {
    _$isUpdatingStatusAtom.reportWrite(value, super.isUpdatingStatus, () {
      super.isUpdatingStatus = value;
    });
  }

  final _$currentlySelectedDeviceKeyAtom =
      Atom(name: '_MqttStore.currentlySelectedDeviceKey');

  @override
  String get currentlySelectedDeviceKey {
    _$currentlySelectedDeviceKeyAtom.reportRead();
    return super.currentlySelectedDeviceKey;
  }

  @override
  set currentlySelectedDeviceKey(String value) {
    _$currentlySelectedDeviceKeyAtom
        .reportWrite(value, super.currentlySelectedDeviceKey, () {
      super.currentlySelectedDeviceKey = value;
    });
  }

  final _$currentDeviceIndexAtom = Atom(name: '_MqttStore.currentDeviceIndex');

  @override
  int get currentDeviceIndex {
    _$currentDeviceIndexAtom.reportRead();
    return super.currentDeviceIndex;
  }

  @override
  set currentDeviceIndex(int value) {
    _$currentDeviceIndexAtom.reportWrite(value, super.currentDeviceIndex, () {
      super.currentDeviceIndex = value;
    });
  }

  final _$intensityByDeviceKeyAtom =
      Atom(name: '_MqttStore.intensityByDeviceKey');

  @override
  ObservableMap<String, double> get intensityByDeviceKey {
    _$intensityByDeviceKeyAtom.reportRead();
    return super.intensityByDeviceKey;
  }

  @override
  set intensityByDeviceKey(ObservableMap<String, double> value) {
    _$intensityByDeviceKeyAtom.reportWrite(value, super.intensityByDeviceKey,
        () {
      super.intensityByDeviceKey = value;
    });
  }

  final _$statusByDeviceKeyAtom = Atom(name: '_MqttStore.statusByDeviceKey');

  @override
  ObservableMap<String, bool> get statusByDeviceKey {
    _$statusByDeviceKeyAtom.reportRead();
    return super.statusByDeviceKey;
  }

  @override
  set statusByDeviceKey(ObservableMap<String, bool> value) {
    _$statusByDeviceKeyAtom.reportWrite(value, super.statusByDeviceKey, () {
      super.statusByDeviceKey = value;
    });
  }

  final _$initializeAsyncAction = AsyncAction('_MqttStore.initialize');

  @override
  Future initialize() {
    return _$initializeAsyncAction.run(() => super.initialize());
  }

  final _$changeDeviceAsyncAction = AsyncAction('_MqttStore.changeDevice');

  @override
  Future changeDevice(int index) {
    return _$changeDeviceAsyncAction.run(() => super.changeDevice(index));
  }

  final _$sendRandomValidDataAsyncAction =
      AsyncAction('_MqttStore.sendRandomValidData');

  @override
  Future sendRandomValidData() {
    return _$sendRandomValidDataAsyncAction
        .run(() => super.sendRandomValidData());
  }

  final _$sendRandomInvalidDataAsyncAction =
      AsyncAction('_MqttStore.sendRandomInvalidData');

  @override
  Future sendRandomInvalidData() {
    return _$sendRandomInvalidDataAsyncAction
        .run(() => super.sendRandomInvalidData());
  }

  final _$updateServerStatusAsyncAction =
      AsyncAction('_MqttStore.updateServerStatus');

  @override
  Future updateServerStatus(bool mode) {
    return _$updateServerStatusAsyncAction
        .run(() => super.updateServerStatus(mode));
  }

  final _$updateServerIntensityAsyncAction =
      AsyncAction('_MqttStore.updateServerIntensity');

  @override
  Future updateServerIntensity(double newIntensity) {
    return _$updateServerIntensityAsyncAction
        .run(() => super.updateServerIntensity(newIntensity));
  }

  final _$getValuesFromServerAsyncAction =
      AsyncAction('_MqttStore.getValuesFromServer');

  @override
  Future getValuesFromServer() {
    return _$getValuesFromServerAsyncAction
        .run(() => super.getValuesFromServer());
  }

  final _$_MqttStoreActionController = ActionController(name: '_MqttStore');

  @override
  dynamic updateIntensity(double value) {
    final _$actionInfo = _$_MqttStoreActionController.startAction(
        name: '_MqttStore.updateIntensity');
    try {
      return super.updateIntensity(value);
    } finally {
      _$_MqttStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  dynamic updateStatus(bool value) {
    final _$actionInfo = _$_MqttStoreActionController.startAction(
        name: '_MqttStore.updateStatus');
    try {
      return super.updateStatus(value);
    } finally {
      _$_MqttStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
isError: ${isError},
isClientConnected: ${isClientConnected},
isUpdatingIntensity: ${isUpdatingIntensity},
isUpdatingStatus: ${isUpdatingStatus},
currentlySelectedDeviceKey: ${currentlySelectedDeviceKey},
currentDeviceIndex: ${currentDeviceIndex},
intensityByDeviceKey: ${intensityByDeviceKey},
statusByDeviceKey: ${statusByDeviceKey},
currentToken: ${currentToken},
intensity: ${intensity},
status: ${status}
    ''';
  }
}
