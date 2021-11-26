// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'mqtt_rpc_response_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MqttRpcResponse _$MqttRpcResponseFromJson(Map<String, dynamic> json) =>
    MqttRpcResponse(
      method: $enumDecode(_$RpcMethodEnumMap, json['method']),
      parameters: json['params'],
    );

Map<String, dynamic> _$MqttRpcResponseToJson(MqttRpcResponse instance) {
  final val = <String, dynamic>{
    'method': _$RpcMethodEnumMap[instance.method],
  };

  void writeNotNull(String key, dynamic value) {
    if (value != null) {
      val[key] = value;
    }
  }

  writeNotNull('params', instance.parameters);
  return val;
}

const _$RpcMethodEnumMap = {
  RpcMethod.getStatus: 'getStatus',
  RpcMethod.getIntensity: 'getIntensity',
  RpcMethod.setStatus: 'setStatus',
  RpcMethod.setIntensity: 'setIntensity',
};
