---
title: Swagger配置
date: 2024-08-03 10:59:00
categories: 开发
tags: swagger
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17229103601021722910359113.png
---


### 1、swagger各版本介绍和依赖导入

1. `springfox-swagger2` 和 `springfox-swagger-ui` ：

   - 这是较早的 Swagger 整合方式，适用于传统的 Spring 框架项目。

   - 配置相对较为复杂，需要手动设置较多的参数和配置项。

     依赖导入：

     ```xml
     <dependency>
         <groupId>io.springfox</groupId>
         <artifactId>springfox-swagger2</artifactId>
         <version>2.9.2</version>
     </dependency>
     
     <dependency>
         <groupId>io.springfox</groupId>
         <artifactId>springfox-swagger-ui</artifactId>
         <version>2.9.2</version>
     </dependency>
     ```

2. `io.springfox:springfox-boot-starter` ：

   - 专门为 Spring Boot 项目设计的启动器。

   - 对常见的配置进行了封装和简化，使集成过程更加便捷。

     依赖导入:

     ```xml
     <dependency>
         <groupId>io.springfox</groupId>
         <artifactId>springfox-boot-starter</artifactId>
         <version>3.0.0</version>
     </dependency>
     ```

3. `org.springdoc:springdoc-openapi-starter-webmvc-ui` ：

   - 基于 OpenAPI 规范，提供了更现代化和灵活的接口文档生成方式。

   - 与 Spring Boot 的整合更加紧密和自然，能够自动扫描和生成文档。

     依赖导入：

     ```xml
     <dependency>
         <groupId>org.springdoc</groupId>
         <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
         <version>2.2.0</version>
     </dependency>
     ```

### 2、配置类

在`application.yml`中可以自定义`api-docs`和`swagger-ui`的访问路径。

```yaml
springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html
```

定义springdoc配置类

```java
/**
 * @Author AsteroidQiao
 * OpenAPI 
 */
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        Contact contact = new Contact().name("成大事")
                                  .email("asteroidqiao@163.com")
                                  .url("https://blog.asteroidrocket.top/");
        return new OpenAPI()
                       .info(new Info()
                                     .title("XIAOBAO-小宝")
                                     .description("XIAOBAO短视频平台接口文档")
                                     .version("v1")
                                     .contact(contact));
        //.externalDocs(new ExternalDocumentation()
        //                      .description("项目API文档（美化版）")
        //                      .url("/doc.html")
        //);
        
    }
```

### 3、使用简例

在Controller类和实体类中添加swagger相关注解。

- @Tag 用于标识controller
- @Operation 用于标识方法
- @Schema 用于标识实体类和实体类的属性
- @ApiResponse 用于标识请求的响应
- @Parameters和@Parameter 用于标识请求参数，@Parameter的name需要和变量的命名一致，@Parameter要放到函数形参前面

1. ##### Controller

```java
@Tag(name = "SysUserController", description = "后台用户管理")
@RestController
@RequestMapping("/user")
public class SysUserController {
    @Resource
    private SysUserService userService;

    @Operation(summary = "修改用户")
    @PutMapping("/update")
    public void update(@RequestBody SysUser user) {
        userService.update(user);
    }
}
```

1. SysUser.java

```java
// SysUser.java
/**
 * 用户实体类
 */
@Getter
@Setter
@Schema(description = "用户")
public class SysUser {
    @Schema(description = "用户名")
    private String username;

    @Schema(description = "密码")
    private String password;
}
```

### 4、swagger2(springfox)与swagger3(springdoc)常用注解对比

| swagger2           | swagger3                                                     | 注解位置                         |
| ------------------ | ------------------------------------------------------------ | -------------------------------- |
| @Api               | @Tag(name = “接口名称”，description="接口描述")              | Controller 类                    |
| @ApiOperation      | @Operation(summary =“接口方法描述”)                          | Controller 方法                  |
| @ApiImplicitParams | @Parameters                                                  | Controller 方法                  |
| @ApiImplicitParam  | @Parameter(description=“参数描述”)                           | Controller 方法的 @Parameters 里 |
| @ApiParam          | @Parameter(description=“参数描述”)                           | Controller 方法的参数上          |
| @ApiIgnore         | @Parameter(hidden = true) 或 @Operation(hidden = true) 或 @Hidden | Controller 方法的参数上          |
| @ApiModel          | @Schema                                                      | DTO类上                          |
| @ApiModelProperty  | @Schema                                                      | DTO属性上                        |

### 5、SpringDoc的注解说明

#### 作用于类的注解

##### 1、@Tag

用于说明或定义的标签。也可以作用于方法上
部分参数：

`name`：名称
`description`：描述

```java
@Tag(name = "用户接口", description = "用户接口描述")
@RestController
@RequestMapping("/users")
public class UserController {
}
```

##### 2、@Hidden

某个元素（API操作、实体类属性等）是否在 API 文档中隐藏。当我们想要隐藏某些不必要的信息时，可以使用@Parameter(hidden = true)、@Operation(hidden = true)或者@Hidden注解。

##### 3、@ApiResponse

API 的响应信息。也可以作用于方法上，一般常用于方法上
部分参数：

responseCode：响应的 HTTP 状态码
description：响应信息的描述
content：响应的内容

```java
@ApiResponse(responseCode = "200", description = "查询成功", content = @Content(schema = @Schema(implementation = User.class)))
@ApiResponse(responseCode = "404", description = "查询失败")
@GetMapping("/users/{id}")
public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
    // ...
}
```

##### 4、@Schema

用于描述实体类属性的描述、示例、验证规则等，比如 VO 类及属性。

部分参数：

name：名称
title：标题
description：描述
example：示例值
required：是否为必须
format：属性的格式。如 @Schema(format = “email”)
maxLength 、 minLength：指定字符串属性的最大长度和最小长度
maximum 、 minimum：指定数值属性的最大值和最小值
pattern：指定属性的正则表达式模式
type： 数据类型（integer，long，float，double，string，byte，binary，
boolean，date，dateTime，password），必须是字符串。
如 @Schema=(type=“integer”)
implementation ：具体的实现类，可以是类本身，也可以是父类或实现的接口。

```java
@Tag(name = "用户", description = "用户实体类")
@Data
public class User {
    @Schema(name = "用户id", type = "long")
    private Long id;
    @Schema(name = "用户名", type = "long")
    private String name;
    @Schema(name = "密码", type = "password", minLength = "6", maxLength = "20")
    private String password;
}
```

#### 作用于方法上

##### 1、@Operation

描述 API 操作的元数据信息。常用于 controller 的方法上

部分参数：

summary：简短描述
description ：更详细的描述
hidden：是否隐藏
tags：标签，用于分组API
operationId：操作的唯一标识符，建议使用唯一且具有描述性的名称
parameters：指定相关的请求参数，使用 @Parameter 注解来定义参数的详细属性。
requestBody：指定请求的内容，使用 @RequestBody 注解來指定请求的类型。
responses：指定操作的返回内容，使用 @ApiResponse 注解定义返回值的详细属性。

```java
@Operation(
  summary = "操作摘要",
  description = "操作的详细描述",
  operationId = "operationId",
  tags = "tag1",
  parameters = {
    @Parameter(name = "param1", description = "参数1", required = true),
    @Parameter(name = "param2", description = "参数2", required = false)
  },
  requestBody = @RequestBody(
    description = "请求描述",
    required = true,
    content = @Content(
      mediaType = "application/json",
      schema = @Schema(implementation = RequestBodyModel.class)
    )
  ),
  responses = {
    @ApiResponse(responseCode = "200", description = "成功", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseModel.class))),
    @ApiResponse(responseCode = "400", description = "错误", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponseModel.class)))
  }
)
public void Operation() {
  // 逻辑
}
```

##### 2、@Parameter

用于描述 API 操作中的参数

部分参数：

name : 指定的参数名
in：参数来源，可选 query、header、path 或 cookie，默认为空，表示忽略
ParameterIn.QUERY 请求参数
ParameterIn.PATH 路径参数
ParameterIn.HEADER header参数
ParameterIn.COOKIE cookie 参数
description：参数描述
required：是否必填，默认为 false
schema ：参数的数据类型。如 schema = @Schema(type = “string”)

```java
@Operation(summary = "根据用户名查询用户列表")
@GetMapping("/query/{username}")
public List<User> queryUserByName(@Parameter(name = "username", in = ParameterIn.PATH,
    description = "用户名",required = true) @PathVariable("username") String userName) {
    return new ArrayList<>();
}
```

##### 3、@Parameters

包含多个 @Parameter 注解，指定多个参数。

```java
@Parameters({
  @Parameter(
    name = "param1",
    description = "description",
    required = true,
    in = ParameterIn.PATH,
    schema = @Schema(type = "string")
  ),
  @Parameter(
    name = "param2",
    description = "description",
    required = true,
    in = ParameterIn.QUERY,
    schema = @Schema(type = "integer")
  )
})
```

##### 5、@RequestBody

部分参数：

mediaType：内容的类型。比如：application/json
schema：内容的模型定义，使用 @Schema 注解指定模型的相关信息。

```java
@Operation(
  requestBody = @RequestBody(
    description = "请求描述",
    required = true,
    content = @Content(
      mediaType = "application/json",
      schema = @Schema(implementation = RequestBodyModel.class)
    )
  )
)
public void Operation() {
  // 逻辑
}
```

#### 场景配置

#####  类及 pojo 上

```java
@Tag(name = "用户", description = "用户交互载体")
@Data
public class User {
    @Schema(name = "用户id", type = "string")
    private String id;
    @Schema(name = "用户名", type = "string")
    private String name;
    @Schema(name = "密码", type = "string")
    private String password;
}
```

##### Controller 上

```java
@RestController
@RequestMapping("/user")
@Tag(name = "用户管理", description = "用户数据增删改查")
public class UserController {
@Autowired
private UserService userService;
 
    @GetMapping("/{id}")
    @Operation(
            summary = "根据ID，查询用户",
            parameters = {
                    @Parameter(name = "id", required = true, in = ParameterIn.PATH)
            },
            responses = {
                    @ApiResponse(responseCode = "200",description = "成功",content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
                    @ApiResponse(responseCode = "400", description = "错误", content = @Content(mediaType = "application/json"))
            }
    )
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
```



