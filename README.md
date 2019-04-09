## react-native-split-bundler


通过学习webpack的dll机制，来实现react-native的精确模块分拆

默认的react-native的metro-bundler的moduleId是自增长的数字，我们将其hash化，并且声称module和moduleId对应的json

通过babel插件精确的替换掉module依赖
