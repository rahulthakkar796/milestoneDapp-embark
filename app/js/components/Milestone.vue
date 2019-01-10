<template>

  <div class="mile">
      <h1 class="text--grey heading">Milestone Contract</h1>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex md12 lg6 xs12 s12>
            
            <v-card class="cardLayout" light color="#B0BEC5" >
              <h3 class="pt-2">No of Milestones created:{{noMilestones}}</h3>
          <v-form class="pa-2">
            
            
            <v-text-field label="Enter Title" v-model="title" prepend-icon="title"></v-text-field>
            <v-text-field label="Enter Price" v-model.number="price" prepend-icon="attach_money"></v-text-field>
            <v-text-field label="Enter Duration" v-model.number="duration" prepend-icon="date_range"></v-text-field>
            <v-btn flat outline @click.prevent="createMilestone" :loading="load">Create Milestone</v-btn>
            

          </v-form>
            </v-card>
           
          </v-flex>
        </v-layout>
          </v-container>
          <v-container class="mt-2 mb-3">
            <v-layout row wrap justify-center align-center>
              <v-flex xs12 md12 lg6>
            <v-card dark flat class="mt-2 mb-2 mileList" v-for="(detail,index) in details" :key="index">
             
              <v-layout row wrap justify-center>
                <v-flex xs12 md6 lg12>
                  <h1 class="pa-2 font-weight-medium">ID:{{index+1}}</h1>
                  <hr class="pa-1">
                 
                  
                  <h2 class="pa-2 font-weight-light">Title:{{detail.title}}</h2>
                </v-flex>
                </v-layout>
                
               
                <v-layout row wrap justify-center align-center>
                <v-flex xs12 md6>
                  <h2 class="pa-2 font-weight-light">Price:{{detail.price}}</h2>
                </v-flex>
                </v-layout>
                <v-layout row wrap justify-center>
                <v-flex xs12 md6>
                  <h2 class="pa-2 font-weight-light">Duration:{{detail.duration}}</h2>
                </v-flex>
                </v-layout>
                <v-layout row wrap justify-center>
                <v-flex xs12 md6>
                  <v-chip outline class="pa-2 heading" text-color="white">Status:{{detail.status}}</v-chip>
                </v-flex> 
                </v-layout>
                 <v-layout row wrap justify-center v-if="detail.status=='Activated' && detail.mins>=0 && detail.secs>=0">
                <v-flex xs12 md6>
                  <v-chip outline class="pa-2 heading" text-color="white">Time Remaining:{{detail.mins}} Mins , {{detail.secs}} secs</v-chip>
                </v-flex> 
                </v-layout>
                
                 <v-card-actions>
                 <v-layout row wrap justify-center align-center>
                  
                    <v-flex xs8 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="activate(index)" :disabled="details[index].status=='Activated'">Activate Milestone</v-btn>
                    </v-flex>
                 
                   <v-flex xs8 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="completeBuyer(index)">Complete by Buyer</v-btn>
                   </v-flex>
                   
                   <v-flex xs8 s3 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="cancelBuyer(index)">Cancel by Buyer</v-btn>
                   </v-flex>
                    
                    <v-flex xs8 s3 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="requestBuyer(index)">Request by Buyer</v-btn>
                    </v-flex>
                     
                     <v-flex xs8 s3 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="completeSeller(index)">Complete by Seller</v-btn>
                     </v-flex>
                     <v-flex xs8 s3 md4>
                    <v-btn flat outline class="mt-2 btn" block @click.prevent="cancelSeller(index)">Cancel by Seller</v-btn>
                    </v-flex>
                    <v-flex xs8 s3 md4>
                    <v-btn flat outline class="mt-2 btn" block center @click.prevent="requestSeller(index)">Request by Seller</v-btn>
                    </v-flex>

                     
                </v-layout>
              </v-card-actions>
               

             
            </v-card>
              </v-flex>
            </v-layout> 
            
          </v-container>
     
  </div>
 
</template>

<script>
import EmbarkJS from 'Embark/EmbarkJS';
import Milestone from 'Embark/contracts/Milestone';
export default {
  
  name: 'Milestone',
  data () {
    return {
     
      eth_address:'',
      title:'',
      price:'',
      duration:'',
      noMilestones:0,
      obj:null,
      details:Array(),
      currentStatus:'',
      mins:0,
      secs:0,
      load:false,
      status:['Milestone created','Activated','Completed By Seller','Completed By Both','Canceled By Seller','Canceled By Buyer','Requested By Seller','Requested By Buyer']
    }
  },
    methods:{
      createMilestone:async function(){
        this.load=true;
        await Milestone.createMilestone(this.title,this.price,this.duration);
        this.noMilestones=await Milestone.noOfMilestones();
          let t=await Milestone.methods.getTitle(this.noMilestones-1).call();
          let p=await Milestone.methods.getPrice(this.noMilestones-1).call();
          let d=await Milestone.methods.getDuration(this.noMilestones-1).call();
          this.currentStatus=await Milestone.methods.getStatus(this.noMilestones-1).call();
          this.obj={title:t,price:p,duration:d,status:this.status[this.currentStatus],mins:0,secs:0};
          this.details.push(this.obj);
          this.load=false;
        
        //await this.storeIn(this.noMilestones);
      },
      timer:function(index){
        let now=new Date(Date.now());
        now=(now.getTime())/1000;
        let time=(this.details[index].duration)*60;
        let totalTime=(time+now);
        let timee=setInterval(()=>{
      
        console.log("time:"+time);
        console.log("now:"+now);
      
        let min=new Date(Date.now());
        min=(min.getTime())/1000;
        let remainTime=totalTime-min;
        //remainTime=parseInt(remainTime/1000);

        let day=parseInt(remainTime/86400);
       console.log("day:"+day);
       remainTime=(remainTime%86400);
       let hour=parseInt(remainTime/3600);
       console.log("hour:"+hour);
        remainTime=(remainTime%3600);
        this.mins=parseInt(remainTime/60);
        console.log("mins:"+this.mins);
        remainTime=(remainTime%60);
        this.secs=parseInt(remainTime);
        console.log("secs:"+this.secs);
        if(remainTime<0){
          console.log("Time's up!");
          clearInterval(timee);
        }

        this.details[index].mins=this.mins;
        this.details[index].secs=this.secs;
        },500
        )
      },
      activate:async function(no){
        await Milestone.activateMilestone(no);
        this.timer(no);
        this.getStatus(no);
       // alert('Milestone activated!');
        
      },
      completeBuyer:async function(index) {
        await Milestone.completeMilestoneBuyer(index);
        this.getStatus(index);
        alert('Milestone completed by Buyer');
        
      },
      cancelBuyer:async function(index){
        await Milestone.cancelBuyer(index);
        this.getStatus(index);
        alert('canceled by buyer');
      },
      requestBuyer:async function(index){
        await Milestone.requestByBuyer(index);
        this.getStatus(index);
        alert('requested by buyer!');
      },
      completeSeller:async function(index){
        await Milestone.completeMilestoneSeller(index);
        this.getStatus(index);
        alert('completed by seller!');
      },
      cancelSeller:async function(index){
        await Milestone.cancelSeller(index);
        this.getStatus(index);
        alert('canceled by Seller1');
      },
      requestSeller:async function(index){
        await Milestone.requestBySeller(index);
        this.getStatus(index);
        alert('requested by seller!');

      },
      getStatus:async function(index) {
        this.currentStatus=await Milestone.methods.getStatus(index).call();
        this.details[index].status=this.status[this.currentStatus];
      },
     
      storeIn:async function(no){
        for(let i=0;i<no;i++){
          let t=await Milestone.methods.getTitle(i).call();
          let p=await Milestone.methods.getPrice(i).call();
          let d=await Milestone.methods.getDuration(i).call();
          this.currentStatus=await Milestone.methods.getStatus(i).call();
          if(this.currentStatus==1){
          
          this.obj={title:t,price:p,duration:d,status:this.status[this.currentStatus],mins:this.mins,secs:this.secs};
          this.details.push(this.obj);
          this.timer(i);
          }
          else{
              this.obj={title:t,price:p,duration:d,status:this.status[this.currentStatus],mins:this.mins,secs:this.secs};
              this.details.push(this.obj);
          }
          
        }
        
      }
    },
    beforeCreate(){
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
          Milestone.noOfMilestones().then(res=>{
          this.noMilestones=res;
          this.storeIn(this.noMilestones); 
        });
          
        })
        

      })
    }
    // beforeMount() {
    //   EmbarkJS.onReady(err=>{
    //     let no=0;
    //     if(err){
    //       console.log(err);
    //     }

    //     for(let i=0;i<this.noMilestones;i++){
    //     this.getStatus(i);
    //     }
    //   })
    // }
}
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardLayout,.mileList{
  border-radius: 15px;
}
.btn{
  /* width:180px; */
  
}

</style>
