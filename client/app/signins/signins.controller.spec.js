'use strict';

describe('Controller: SigninsCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var SigninsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SigninsCtrl = $controller('SigninsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
