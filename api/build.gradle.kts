plugins {
    id("ai.enpasos.website.java-conventions")
}

dependencies {
    implementation(libs.jackson.annotations)
    implementation(libs.commons.lang)

    compileOnly(libs.swagger.annotations)
    compileOnly(libs.swagger.jaxrs)
    compileOnly(libs.javax.validation.api)

    compileOnly(libs.lombok)
    annotationProcessor(libs.lombok)
    testCompileOnly(libs.lombok)
    testAnnotationProcessor(libs.lombok)
}


description = "api"
group = "${group}"

