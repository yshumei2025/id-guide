# ID-SDK/API 接口使用方法

通过 ID-SDK/API 接口接入企业数据并管理数据的方法分为[基础用法](../idsdk-api/basic.md)和[高阶用法](../idsdk-api/advance.md)。

`注：基础用法与企业节点标准版接口实例一致！`

## 基础用法

基础用法指通过 ID-SDK/API 接口注册一条标识，并解析。

本章节模拟生产系统的产品数据接入企业节点 A，应用开发者可参考以下接口调用步骤，实现接口的基础用法。

### 接口调用步骤

应用开发者调用企业节点 A 和企业节点 B 的接口地址，按下述流程，完成产品标识与入库单标识的关联、解析。

<center><img src="./images/step3-api-call.jpg" style="margin-top:10px; width: 300px; height: 417px;"/></center>

1. 调用[身份认证接口](../idsdk-api/basic.md#身份认证)，完成生产系统的标识身份认证
2. 调用[新增元数据接口](../idsdk-api/basic.md#元数据模版创建)，完成产品元数据模板创建
3. 调用[发布元数据接口](../idsdk-api/basic.md#发布产品元数据)，完成产品元数据模板发布
4. 调用[标识注册接口](../idsdk-api/basic.md#标识注册)，完成产品标识创建
5. 调用[标识解析接口](../idsdk-api/basic.md#标识解析)，完成产品标识解析

## 高阶用法

高阶用法指通过 ID-SDK/API 接口关联标识，配置标识数据的访问权限，并解析关联标识，获取有访问权限的数据。

本章节模拟仓储系统的入库单接入企业节点 B，形成入库单标识和产品标识的关联关系。同时，在企业节点 A 配置产品标识的数据权限，实现仓储系统只能获取部分产品数据的访问权限。应用开发者可参考以下接口调用步骤，实现接口的高阶用法。

### 接口调用步骤

应用开发者调用企业节点 A 和企业节点 B 的接口地址，按下述流程，完成产品标识与入库单标识的关联、解析。

<center><img src="./images/step3-related-flow.jpg" style="margin-top:10px;"/></center>

在`企业节点A`按步骤 1 ~ 4，完成以下接口调用：

1. 调用[身份认证接口](../idsdk-api/basic.md#身份认证)，完成生产系统的标识身份认证
2. 调用[新增元数据接口](../idsdk-api/basic.md#元数据模版创建)，完成产品元数据模板创建
3. 调用[发布元数据接口](../idsdk-api/basic.md#发布产品元数据)，完成产品元数据模板发布
4. 调用元数据授权接口，完成产品元数据模板授权
   - 当产品元数据模板的权限为“指定范围”时，需先进行[元数据模板授权](../idsdk-api/advance.md#元数据模板授权)，元数据模板授权完成后，被授权的企业、应用系统将会收到[元数据模板的授权通知](../idsdk-api/advance.md#元数据模板授权通知)
   - 当产品元数据模板的权限为“公开”时，可直接进行[元数据模板关联](../idsdk-api/advance.md#元数据模板关联)

在`企业节点B`按步骤 5 ~ 8，完成以下接口调用：

5. 调用[身份认证接口](../idsdk-api/basic.md#身份认证)，完成仓储系统的标识身份认证
6. 接收到授权通知后，调用新增元数据接口，完成[元数据模板关联](../idsdk-api/advance.md#元数据模板关联)
7. 调用标识注册接口，完成[标识关联](../idsdk-api/advance.md#标识关联)
8. 调用标识解析接口，完成关联[标识的解析](../idsdk-api/advance.md#关联标识解析)

应用开发者调用企业节点 A 和企业节点 B 的接口地址，按下述流程，完成产品标识数据授权及产品标识解析。

<center><img src="./images/step3-data-auth.jpg" style="margin-top:10px;"/></center>

`企业节点B`按步骤 1 ~ 2，完成以下页面操作：

1. 在企业节点 B 的系统中，创建[标识身份组](../idsdk-api/advance.md#advance-create-group)
2. 在企业节点 B 的系统中，将仓储系统的标识身份，加入[标识身份组](../idsdk-api/advance.md#advance-join-handle)

`企业节点A`按步骤 3 ~ 6，完成以下接口调用和页面操作：

3. 在企业节点 A 的系统中，导入企业节点 B 提供的标识身份组
4. 调用[标识身份列表查询接口](../idsdk-api/advance.md#标识身份列表查询)，获取企业节点 B 的标识身份组
5. 若需将同一类产品数据授权给企业节点 B，调用[同类数据授权接口](../idsdk-api/advance.md#同类数据授权)，将产品元数据模板中“指定范围”字段，授权给企业节点 B 的标识身份组。企业节点 B 将会收到该类[数据的授权通知](../idsdk-api/advance.md#标识数据授权通知)
   - 若需将产品标识数据公开时，可调用[同类数据授权接口-公开/非公开](../idsdk-api/advance.md#同类数据授权-公开-非公开)，将产品元数据模板中的所有字段全部设置为“公开”。此时，标识网络中的企业、系统、用户均可解析并查看该类产品数据
6. 若需将单条产品数据授权给企业节点 B，调用[单条数据授权接口](../idsdk-api/advance.md#实例标识单个授权)，将某条产品标识，授权给企业节点 B 的标识身份组。企业节点 B 将会收到该条数据的[授权通知](../idsdk-api/advance.md#标识数据授权通知)

`企业节点B`按步骤 7，完成以下页面操作接口调用：

7. 接收到授权通知后，调用标识解析接口，完成[有访问权限的标识解析](../idsdk-api/advance.md#授权标识解析)
