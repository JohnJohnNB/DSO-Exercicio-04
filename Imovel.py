from Locatario import Locatario
from Locador import Locador
from Mobilia import Mobilia


class Imovel:
    def __init__(self, codigo: int, descricao: str, valor: float, locador: Locador):
        self.__codigo = codigo
        self.__descricao = descricao
        self.__valor = valor
        self.__locador = locador
        self.__locatarios = []
        self.__mobilias = []

    @property
    def codigo(self):
        return self.__codigo

    @codigo.setter
    def codigo(self, codigo: int):
        self.__codigo = codigo

    @property
    def descricao(self):
        return self.__descricao

    @descricao.setter
    def descricao(self, descricao):
        self.__descricao = descricao

    @property
    def valor(self):
        return self.__valor

    @valor.setter
    def valor(self, valor):
        self.__valor = valor

    @property
    def locador(self):
        return self.__locador

    @locador.setter
    def locador(self, locador):
        self.__locador = locador

    @property
    def locatarios(self):
        return self.__locatarios

    def incluir_locatario(self, locatario: Locatario):
        if isinstance(locatario, Locatario) and locatario not in self.__locatarios:
            self.__locatarios.append(locatario)

    def excluir_locatario(self, codigo_locatario: int):
        for locatario in self.__locatarios:
            if locatario.codigo == codigo_locatario:
                self.__locatarios.remove(locatario)

    @property
    def mobilias(self):
        return self.__mobilias

    def incluir_mobilia(self, codigo_mobilia: int, descricao_mobilia: str):
        mobilia = Mobilia(codigo_mobilia, descricao_mobilia)
        if isinstance(mobilia, Mobilia):
            for mob in self.__mobilias:
                if mobilia.codigo == mob.codigo:
                    break
            else:
                self.__mobilias.append(mobilia)

    def excluir_mobilia(self, codigo_mobilia: int):
        for mob in self.__mobilias:
            if mob.codigo == codigo_mobilia:
                self.__mobilias.remove(mob)
                break

    def find_locatario_by_codigo(self, codigo_locatario: int):
        for locatario in self.__locatarios:
            if locatario.codigo == codigo_locatario:
                return locatario
