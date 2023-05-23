import org.springframework.boot.gradle.tasks.bundling.BootJar


plugins {
    id("ai.enpasos.website.java-conventions")
    alias(libs.plugins.springboot)
}

dependencies {
    implementation(project(":api"))
    implementation(libs.springboot.starter.jersey)
    implementation(libs.springboot.starter.web)
    implementation(libs.bouncycastle.tls)
//    implementation(libs.bundles.muzero)
    implementation(libs.jakarta.servlet.api)
    compileOnly(libs.jakarta.ws.rs.api)
    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
    testCompileOnly(libs.lombok)
    testAnnotationProcessor(libs.lombok)
}

description = "webserver"
group = "${group}"



tasks.getByName("processResources") {
    finalizedBy("copyWebgui")
}

tasks.register("copyWebgui") {

    doLast {

        val fromDir = "${project.projectDir}/../webgui/dist/enpasos.ai"
        val toDir = "${project.projectDir}/build/resources/main/public"

        ant.withGroovyBuilder {
            "echo"("message" to "##########")

            "copy"("todir" to toDir) {
                "fileset"("dir" to fromDir)
            }

        }
    }
}

configurations {
    all {
        exclude(group = "org.apache.logging.log4j", module = "log4j-to-slf4j")
        exclude(group = "org.slf4j", module = "slf4j-simple")
    }
}

tasks.named<BootJar>("bootJar") {
    mainClass.set("ai.enpasos.web.server.EnpasosAiWebserver")
    this.archiveFileName.set("enpasosai-webserver-${archiveVersion.get()}.${archiveExtension.get()}")

}


