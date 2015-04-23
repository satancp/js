'use strict';

describe('Controller: InfosCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var InfosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfosCtrl = $controller('InfosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
