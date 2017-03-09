# Service Manual Frontend

Service Manual Frontend is a public-facing app to display the service manual formats on GOV.UK.

## Technical documentation

This is a Ruby on Rails application that fetches documents from
[content-store](https://github.com/alphagov/content-store) and displays them.

### Dependencies

- [content-store](https://github.com/alphagov/content-store) - provides documents
- [static](https://github.com/alphagov/static) - provides shared GOV.UK assets and templates.

### Running the application

You can use [Bowler](https://github.com/JordanHatch/bowler) to automatically run
the application and all of its dependencies. To do this, you'll need to check
out the [development repository](https://github.gds/gds/development) where the
`Pinfile` is located.

```
cd /var/govuk/development
bowl service-manual-frontend
```

Alternatively, run `./startup.sh` in the `service-manual-frontend` directory.

```
cd /var/govuk/service-manual-frontend
./startup.sh
```

The application runs on port `3122` by default. If you're using the GDS VM it'll
be available at http://service-manual-frontend.dev.gov.uk.

Note that the application *does not serve content at its root (/)* - the
homepage will be found at service-manual-frontend.dev.gov.uk/service-manual but
only if the content item for the homepage exists in the content store.

You can achieve this by restoring from a production backup, publishing the home
page using the rake task in service-manual-publisher or by using the dummy
content store.

### Running the test suite

The test suite relies on the presence of the
[govuk-content-schemas](http://github.com/alphagov/govuk-content-schemas)
repository. If it is present at the same directory level as
the service-manual-frontend repository then run the tests with:

`bundle exec rake`

Or to specify the location explicitly:

`GOVUK_CONTENT_SCHEMAS_PATH=/some/dir/govuk-content-schemas bundle exec rake`

#### Visual regression tests

Use [Wraith](http://bbc-news.github.io/wraith/) ("A responsive screenshot
comparison tool") to generate a visual diff to compare rendering changes in this
application.

Wraith **does not work correctly from within the VM** because
assets-origin.dev.gov.uk is not resolvable within the VM, and so none of the
assets load. You should instead install wraith on your local machine and run
it from there.

Wraith has some dependencies you'll also
[need to install](http://bbc-news.github.io/wraith/os-install.html).

First, on `master` branch, run:
```
wraith history test/wraith/config.yaml
```

Then, on a branch with your changes, run:
```
wraith latest test/wraith/config.yaml
```

This will generate image diffs comparing the two runs, including a browseable
gallery of the output, in `tmp/wraith`.

### Use of BEM

The Service manual frontend application uses a modified version of [the BEM methodology](https://en.bem.info),
coined by [Harry Roberts](https://en.bem.info/methodology/naming-convention/#alternative-naming-schemes).

It uses the following conventions:
* block, element and modifier names are written in lower case
* words within the names of BEM entities are separated by a hyphen (-)
* an element name is separated from a block name by a double underscore (__)
* modifiers are delimited by double hyphens (--)
* [Key-value type modifiers](https://en.bem.info/methodology/naming-convention/#element-modifier) are not used

A block:

    .button

An element:

    .button__icon

A modifier:

    .button--large


## Licence

[MIT License](LICENCE)
