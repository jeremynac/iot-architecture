import 'package:front_light_sensor/types/rpc_method.dart';
import 'package:json_annotation/json_annotation.dart';

part 'mqtt_rpc_response_model.g.dart';

@JsonSerializable(includeIfNull: false)
class MqttRpcResponse {
  @JsonKey(name: "method")
  RpcMethod method;
  @JsonKey(name: "params")
  dynamic parameters;
  MqttRpcResponse({required this.method, required this.parameters});
  factory MqttRpcResponse.fromJson(dynamic json) => _$MqttRpcResponseFromJson(json);
  Map<String, dynamic> toJson() => _$MqttRpcResponseToJson(this);
}
