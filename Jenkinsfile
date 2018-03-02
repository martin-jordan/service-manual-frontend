#!/usr/bin/env groovy

library("govuk")

node {
  // Deployed by Puppet's Govuk_jenkins::Pipeline manifest

  govuk.buildProject(
    overrideTestTask: {
      stage("Run tests") {
        govuk.withStatsdTiming("test_task") {
          govuk.runRakeTask('test')
          govuk.runRakeTask("spec:javascript")
        }
      }
    }
  )
}
