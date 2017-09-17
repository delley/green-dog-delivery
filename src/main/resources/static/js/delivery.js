var app = angular.module("delivery", ["checklist-model"],
  function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })
  });

app.controller('pedidoController',
  function($scope, $location, $http) {

    $scope.itens = [];
    $scope.clientes = [];
    $scope.pedido = {
      cliente: {},
      itens: [],
      subTotal: 0
    };

    var carregarItens = function() {
      $http.get("/api/itens")
        .success(function(data) {
          $scope.itens = data["_embedded"]["itens"];
        })
        .error(function(data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
    };

    var carregarClientes = function() {
      $http.get("/api/clientes")
        .success(function(data) {
          $scope.clientes = data["_embedded"]["clientes"];
        })
        .error(function(data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
    }

    $scope.fazerPedido = function(pedido) {
      $scope.message = "";
      var pedidoStr = "";
      var prefixo = "";
      for (var i = 0; i < pedido.itens.length; i++) {
        pedidoStr += prefixo + pedido.itens[i].id;
        prefixo = ",";
      }
      $scope.urlPedido = "/rest/pedido/novo/" + pedido.cliente.id + "/" + pedidoStr;
      $http.get($scope.urlPedido)
        .success(function(data) {
          $scope.idPedido = data["pedido"];
          $scope.mensagem = data["mensagem"];
          $scope.valorTotal = data["valorTotal"];
          pedido.cliente = {};
          pedido.itens = [];
          pedido.subTotal = 0;
        })
        .error(function(data, status) {
          $scope.message = "Aconteceu um problema: " + "Status: " + data.status + " - error: " + data.error;
        });
    };
    $scope.isItemSelecionado = function() {
      if (this.checked)
        $scope.pedido.subTotal += this.iten.preco;
      else
        $scope.pedido.subTotal -= this.iten.preco;
    }
    carregarClientes();
    carregarItens();
  });
