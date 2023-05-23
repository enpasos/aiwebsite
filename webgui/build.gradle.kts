import com.github.gradle.node.npm.proxy.ProxySettings
import com.github.gradle.node.npm.task.NpmTask
import com.github.gradle.node.npm.task.NpxTask
import com.github.gradle.node.task.NodeTask
import com.github.gradle.node.yarn.task.YarnTask

plugins {
 id("com.github.node-gradle.node") version "3.5.0"
}

description = "webgui"
group = "${group}"


node {
  version.set("18.12.1")
  npmVersion.set("")
  yarnVersion.set("")
  npmInstallCommand.set("install")
  download.set(true)
  workDir.set(file("${project.projectDir}/.cache/nodejs"))
  npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
  yarnWorkDir.set(file("${project.projectDir}/.cache/yarn"))
  nodeProjectDir.set(file("${project.projectDir}"))
}

tasks.npmInstall {
  nodeModulesOutputFilter {
    exclude("notExistingFile")
  }
}

tasks.register("build") {
  dependsOn(tasks.npmInstall)
  doLast {
    //val greeting = "hello from Ant"
    val npm = "${project.projectDir}/.cache/nodejs/node-v18.12.1-win-x64/npm.cmd"
    val node = "${project.projectDir}/.cache/nodejs/node-v18.12.1-win-x64/node.exe"
    val quasar = "${project.projectDir}/node_modules/@quasar/cli/bin/quasar"

    ant.withGroovyBuilder {
      "echo"("message" to npm)
      "echo"("message" to node)
      "echo"("message" to quasar)

      "exec"(
        "executable" to "cmd.exe",
        "dir" to "${project.projectDir}",
        "outputproperty" to "myoutput2"
      ) {
        "arg"("line" to "/c ${node} ${quasar} build")
      }
      "echo"("message" to ant.properties["myoutput2"])


    }
  }
}




