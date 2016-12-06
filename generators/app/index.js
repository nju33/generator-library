'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const {toStudlyCaps} = require('strman');

// reference
// http://yeoman.io/authoring/user-interactions.html

module.exports = yeoman.Base.extend({
  // constructor() {
  //   generator.Base.apply(this, arguments)
  //
  //   this.option('name');
  //   this.option('description');
  // },

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('generator-library') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Library name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Library description',
        default: ''
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.className = toStudlyCaps(props.name);
      this.props.nameHeadline = this.props.className
                                  .replace(/([A-Z])/g, " $1").slice(1);
    }.bind(this));
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('raw/'),
      this.destinationPath('.'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('raw/.*'),
      this.destinationPath('.'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('lib.js'),
      this.destinationPath(`lib/${this.props.name}.js`),
      this.props
    );
  },

  install() {
    this.runInstall('yarn', [],  err => {
      if (err !== 0) {
        throw new Error(err);
      }

      console.log(yosay('Complete!'));
    });
    // this.installDependencies();
  }
});
