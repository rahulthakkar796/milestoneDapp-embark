<template>

  <div>
      <h1 class="text--grey heading">Receive Contract</h1>
      <v-container text-xs-caption>
        <v-layout row wrap justify-center>
          <v-flex md12 lg6 xs12 s12>
            
            <v-card class="rec" light color="#B0BEC5" >
                <v-flex xs12 text-lg-headline>
             <p class="headline font-weight-normal pt-2 text-truncate">Your address:{{eth_address}}</p>
                </v-flex>
             <h2 class="font-weight-light pa-2">Your balance:{{balance}}</h2>
            <v-form class="pa-2">
                <v-text-field label="Enter amount to receive" v-model.number="bal"></v-text-field>
                <v-btn flat outline @click.prevent="receiveTokens">Receive Tokens</v-btn>
            </v-form>
            </v-card>
           
          </v-flex>
        </v-layout>
          </v-container>
          
               

           
            
        
  </div>
 
</template>

<script>
import EmbarkJS from 'Embark/EmbarkJS';
import Receive from 'Embark/contracts/Receive';
export default {
  
  name: 'Milestone',
  data () {
    return {
     
      eth_address:'',
      bal:'',
      balance:''
     

    }
  },
    methods:{
      createMilestone:async function(){
        await Milestone.createMilestone(this.title,this.price,this.duration);
        this.noMilestones=await Milestone.noOfMilestones();
         
        //await this.storeIn(this.noMilestones);
      },
      getNoOfMilestones:async function(){
        let no=await Milestone.noOfMilestones();
        return no;
      },
      getBalance:async function(){
          this.balance=await Receive.methods.showBalance().call();
          console.log(this.balance);
      },
      receiveTokens:async function(){
          await Receive._Transfer(this.eth_address,this.bal);
          this.balance=await Receive.showBalance();
      }
      
        
      
    },
    created(){
      EmbarkJS.onReady(err=>{
        let no=0;
        if(err){
          console.log(err);
        }
        web3.eth.getAccounts((error, result)=> {
          if(error){
            console.log(err);
          }
          this.eth_address=result[0];
        })
        this.getBalance();

      })
     

    }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rec{
  border-radius: 15px;
}

</style>
