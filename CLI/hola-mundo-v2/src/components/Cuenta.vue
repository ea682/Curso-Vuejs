<template>
    <h2>Tipo de cuenta: {{cuenta}}</h2>
    <h2>Saldo: {{saldo}}</h2>
    <h2>Estado: {{estado ? "Activada" : "Desactivada"}}</h2>
    <div v-for="(servicio, index) in servicios" :key="index.id"> 
        {{index+1}}-{{servicio}}
    </div>
    <AccionSaldo 
        texto="Aumentar saldo"
        @accion="aumentar()"
    />
    <AccionSaldo 
        texto="Disminuir saldo"
        @accion="disminuir()"
        :desactivar="desactivar"
    />
</template>

<script>
import AccionSaldo from './AccionSaldo';

export default {

    components : {
        AccionSaldo
    },
    data(){
        return {
            saldo: 1000,
            cuenta: "Visa",
            estado: false,
            servicios: ['giro', 'abono', 'transferencia'],
            desactivar: false
        }
    },
    methods: {
        aumentar(){
            this.saldo = this.saldo + 100;
             this.desactivar = false;
        },
        disminuir(){
            let consultaSaldo = this.saldo - 100;
            if(consultaSaldo < 0){
                alert("No se permiten numeros negativos");
                this.saldo = 0;
                this.desactivar = true;
            }else{
                this.saldo = consultaSaldo;
            }
            
        }
    }
}
</script>

<style>

</style>