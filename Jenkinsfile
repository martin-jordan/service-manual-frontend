#!/usr/bin/env groovy

node {
  // Deployed by Puppet's Govuk_jenkins::Pipeline manifest
  def govuk = load '/var/lib/jenkins/groovy_scripts/govuk_jenkinslib.groovy'

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
