/* eslint-disable quotes */
const jsonResult = `[{"name":"common","status":"unchanged","children":[{"name":"follow","status":"added","value":false},{"name":"setting1","status":"unchanged","value":"Value 1"},{"name":"setting2","status":"deleted","value":200},{"name":"setting3","status":"changed","oldValue":true,"newValue":null},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":[{"name":"key5","status":"unchanged","value":"value5"}]},{"name":"setting6","status":"unchanged","children":[{"name":"doge","status":"unchanged","children":[{"name":"wow","status":"changed","oldValue":"","newValue":"so much"}]},{"name":"key","status":"unchanged","value":"value"},{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","status":"unchanged","children":[{"name":"baz","status":"changed","oldValue":"bas","newValue":"bars"},{"name":"foo","status":"unchanged","value":"bar"},{"name":"nest","status":"changed","oldValue":[{"name":"key","status":"unchanged","value":"value"}],"newValue":"str"}]},{"name":"group2","status":"deleted","value":[{"name":"abc","status":"unchanged","value":12345},{"name":"deep","status":"unchanged","value":[{"name":"id","status":"unchanged","value":45}]}]},{"name":"group3","status":"added","value":[{"name":"deep","status":"unchanged","value":[{"name":"id","status":"unchanged","value":[{"name":"number","status":"unchanged","value":45}]}]},{"name":"fee","status":"unchanged","value":100500}]}]`;

export default jsonResult;