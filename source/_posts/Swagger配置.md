---
title: Swagger配置
date: 2024-08-03 10:59:00
categories: 开发
tags: swagger
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17226552007691722655200110.png
---

#### 1、swagger各版本介绍和依赖导入

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

#### 2、配置类

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

#### 3、使用示例

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

#### 4、swagger2(springfox)与swagger3(springdoc)常用注解对比

| swagger2           | swagger3                                                     | 注解位置                         |
| ------------------ | ------------------------------------------------------------ | -------------------------------- |
| @Api               | @Tag(name = “接口类描述”)                                    | Controller 类                    |
| @ApiOperation      | @Operation(summary =“接口方法描述”)                          | Controller 方法                  |
| @ApiImplicitParams | @Parameters                                                  | Controller 方法                  |
| @ApiImplicitParam  | @Parameter(description=“参数描述”)                           | Controller 方法的 @Parameters 里 |
| @ApiParam          | @Parameter(description=“参数描述”)                           | Controller 方法的参数上          |
| @ApiIgnore         | @Parameter(hidden = true) 或 @Operation(hidden = true) 或 @Hidden | Controller 方法的参数上          |
| @ApiModel          | @Schema                                                      | DTO类上                          |
| @ApiModelProperty  | @Schema                                                      | DTO属性上                        |
