'use strict';

describe('Controller: SecondcommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var SecondcommentsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SecondcommentsCtrl = $controller('SecondcommentsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
