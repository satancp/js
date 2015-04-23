'use strict';

describe('Controller: SignupsCtrl', function () {

  // load the controller's module
  beforeEach(module('as2App'));

  var SignupsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupsCtrl = $controller('SignupsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
