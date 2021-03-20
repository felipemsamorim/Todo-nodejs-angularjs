'use strict';

angular.module('myApp.TodoList', ['ngRoute', 'myApp.todolistService'])
  .controller("TodoListCtrl", function ($scope, Todo) {
    $scope.tasks = [];
    $scope.emptyDescription  = false
    $scope.emptyEmail   = false
    $scope.invalidEmail   = false
    $scope.emptyResp  = false
    $scope.SenhaSupervisor = '     '
    $scope.idToDelete = 0
    $scope.idReabrir = 0
    $scope.msgErro = ''
    var modal = angular.element(document.querySelector('#confirm-delete'))[0]
    var modalSupervisor = angular.element(document.querySelector('#modal-supervisor'))[0]
    var modalErro = angular.element(document.querySelector('#modal-erro'))[0]

    angular.element(document.querySelector('#delete')).on('click', function () {
      modal.close();
      $scope.confirmDelete()
    });

    angular.element(document.querySelector('#cancel')).on('click', function () {
      modal.close();
    });

    angular.element(document.querySelector('#fecharErro')).on('click', function () {
      modalErro.close();
    });

    angular.element(document.querySelector('#fechaSupervisor')).on('click', function () {
      modalSupervisor.close();
    });

    $scope.saveTask = function () {
      if (!$scope.task_name ||
        !$scope.email ||
        !$scope.nome_resp) {
          $scope.emptyDescription  = true
          $scope.emptyEmail   = true
          $scope.emptyResp  = true
      } else {
        Todo.base.save({
          Descricao: $scope.task_name,
          Email: $scope.email,
          NomeResp: $scope.nome_resp,
          RetornoCount: $scope.nome_resp,
          retornoCount: 0,
          Status: false
        }, function (r) {
          $scope.limpaCampos()
          $scope.getTasks()
        }, function (e) {
          $scope.invalidEmail   = true
          $scope.msgErro = e.data.message
          modalErro.showModal()
          })
      }

    };
    $scope.getTasks = function () {
      Todo.base.get(function (data) {
        $scope.tasks = [];
        for (var i = 0; i < data.length; i++) {
          var obj = data[i]
          $scope.tasks.push({
            id: obj.Id,
            task_name: obj.Descricao,
            email: obj.Email,
            nome_resp: obj.NomeResp,
            retornoCount: obj.RetornoCount,
            status: obj.Status,
          });
        }
      })
    };
    $scope.delete = function (id) {
      modal.showModal()
      $scope.idToDelete = id
    };

    $scope.confirmDelete = function () {
      Todo.base.delete({ id: $scope.idToDelete }, function () { $scope.getTasks() })
    }

    $scope.finished = function (i) {
      $scope.find(i)
      $scope.idReabrir = i
    };

    $scope.find = function (id) {
      angular.forEach($scope.tasks, function (obj) {
        if (obj.id == id) {
          if (obj.status == 1 && obj.retornoCount == 2) {
            $scope.msgErro = 'Tarefa não pode mais ser reaberta'
            modalErro.showModal()
            return 0
          } else {
            switch (obj.status) {
              case 0:
                Todo.concluir.get({ id: id }, function () { $scope.getTasks() })
                break;

              default:
                modalSupervisor.showModal()
                break;
            }
          }
        }
      })
    }
    $scope.randomInsert = function () {
      Todo.randominsert(function (d) { 
        $scope.getTasks() 
      },
      function (error) { 
        $scope.msgErro = JSON.stringify(error)
        modalErro.showModal()
        $scope.getTasks() })
    }
    $scope.confirmaReabrir = function () {
      Todo.reabrir({ id: $scope.idReabrir, auth: $scope.SenhaSupervisor },
        function (d) {
          modalSupervisor.close()
          $scope.getTasks()
        },
        function (e) {
          $scope.msgErro = e.data.message
          modalErro.showModal()
        })
    }
    $scope.getTasks();
    $scope.limpaCampos = function(){
    $scope.task_name = ''
    $scope.email = ''
    $scope.nome_resp = ''
  }
  });
  
