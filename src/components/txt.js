'use strict';
import api from './api';
import { globalData } from './global.js';
import Header from './header';
import {  Toast } from 'antd-mobile';

var appBasePath = globalData.appBasePath;
var Txt = React.createClass({
    getInitialState: function () {
        return {
            txtCon: ""
        }
    },
    componentDidMount: function () {

    },
    back(){
        history.go(-1);
    },
    render: function () {
        var txtData = this.props.location;
        var title = txtData.state.title;
        var backRouter = txtData.state.backRouter;
        var fromId = txtData.state.fromId;
        var txtCon = [];

        if (fromId == 1) {
            //设置，关于万融汇
            txtCon = `<p>
    <span style="font-size:0.28rem;font-family:黑体">万融汇致力于为个人消费者和小微企业提供金融产品的搜索、推荐和申请服务, 业务范围涵盖贷款、信用卡与理财。此外，还免费为用户提供便捷、划算、安全的金融信息。</span>
</p>
<p style="font-size:0.28rem;font-family:黑体">万融汇贷款业务涵盖个人消费贷、经营贷、房贷、车贷。平台通过大数据技术，解决融资贷款过程中的信息不对称问题。用户通过万融汇独有的智能匹配系统，可一站式比较市面款贷款产品，筛选产品并直接提交申请。对借款产品而言，万融汇则是批量获取优质客户的营销渠道。</p>
<p style="font-size:0.28rem;font-family:黑体">万融汇信用卡频道，是全方位金融信息服务平台的一部分。
信用卡频道服务所有“对信用卡有需求的人”——从工薪阶层、时尚白领、网购达人、到精明主妇、生意人…… 相对于贷款业务满足几千到几千万的资金需求，信用卡则满足用户几千元到几万元的资金需求。信用卡频道通过“推荐+筛选匹配”方式，帮助用户找对最适合的卡，降低用户获取成本；并且对申卡体验、办卡速度、核卡的审批率不断进行优化，使用户体验更好。与此同时，信用卡频道还提高银行的营销效率。</p>

`;
        } else if(fromId == 2){
            //用户注册协议
            txtCon = `
            <p>
                <span style="font-size:13px;font-family:黑体">本平台由陕西万福网络科技有限公司及其关联实体(以下简称“我们”或“陕西万福”)运营，我们依照以下注册协议向您提供本注册协议涉及的相关服务。请您使用万融汇服务前仔细阅读本注册协议。您只有完全同意所有注册协议，才能成为万融汇的用户（"用户"）并使用相应服务。您在注册为万融汇用户过程中点击"同意万融汇用户注册协议"按钮即表示您已仔细阅读并明确同意遵守本注册协议以及经参引而并入其中的所有条款、政策以及指南，并受该等规则的约束（合称"本注册协议"）。我们可能根据法律法规的要求或业务运营的需要，对本注册协议不时进行修改。除非另有规定，否则任何变更或修改将在修订内容于万融汇发布之时立即生效，您对万融汇的使用、继续使用将表明您接受此等变更或修改。如果您不同意本注册协议（包括我们可能不定时对其或其中引述的其他规则所进行的任何修改）的全部规定，则请勿使用万融汇提供的所有服务，或您可以主动取消万融汇提供的服务。 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">为了便于您了解适用于您使用万融汇的条款和条件，我们将在万融汇上发布我们对本注册协议的修改，您应不时地审阅本注册协议以及经参引而并入其中的其他规则。

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold">一、服务内容
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">1.1 万融汇的具体服务内容由我们根据实际情况提供并不时更新，包括但不限于信息、图片、文章、评论、链接等，我们将定期或不定期根据用户的意愿以电子邮件、短信、电话或站内信等方式为用户提供活动信息，并向用户提供相应服务。我们对提供的服务拥有最终解释权。 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">1.2 万融汇服务仅供个人用户使用。除我们书面同意，您或其他用户均不得将万融汇上的任何信息用于商业目的。 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">1.3 您使用万融汇服务时所需的相关的设备以及网络资源等（如个人电脑及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均由您自行负担。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold">二、信息提供和隐私保护
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">2.1 您在访问、使用万融汇或申请使用万融汇服务时，必须提供本人真实的个人信息，且您应该根据实际变动情况及时更新个人信息。保护用户隐私是我们的重点原则，我们通过各种技术手段和强化内部管理等办法提供隐私保护服务功能，充分保护您的个人信息安全。 

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">2.2 万融汇不负责审核您提供的个人信息的真实性、准确性或完整性，因信息不真实、不准确或不完整而引起的任何问题及其后果，由您自行承担，且您应保证我们免受由此而产生的任何损害或责任。若我们发现您提供的个人信息是虚假、不准确或不完整的，我们有权自行决定终止向您提供服务。 

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">2.3 您已明确授权，为提供服务、履行协议、解决争议、保障交易安全等目的，我们对您提供的、我们自行收集的及通过第三方收集的您的个人信息、您申请服务时的相关信息、您在使用服务时储存在万融汇的非公开内容以及您的其他个人资料（以下简称“个人资料”）享有留存、整理加工、使用和披露的权利，具体方式包括但不限于： 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（1）出于为您提供服务的需要在本平台公示您的个人资料；
            </p><p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（2）由人工或自动程序对您的个人资料进行获取、评估、整理、存储； 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（3）使用您的个人资料以改进本平台的设计和推广；  
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（4）使用您提供的联系方式与您联络并向您传递有关服务和管理方面的信息；

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（5）对您的个人资料进行分析整合并向为您提供服务的第三方提供为完成该项服务必要的信息。当为您提供服务的第三方与您电话核实信息时，为保证为您服务的质量，你同意万融汇对上述核实电话进行录音。 

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;">（6）在您违反与我们或我们的其他用户签订的协议时，披露您的个人资料及违约事实，将您的违约信息写入黑名单并与必要的第三方共享数据，以供我们及第三方审核、追索之用。 

            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（7）其他必要的使用及披露您个人资料的情形。 
                您已明确同意本条款不因您终止使用万融汇服务而失效。如因我们行使本条款项下权利使您遭受损失，我们对该等损失免责。
                
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;">2.4 为更好地为您提供服务，您同意并授权万融汇可与其合作的第三方进行联合研究，并可将通过本协议获得的您的信息投入到该等联合研究中。但万融汇与其合作的第三方在开展上述联合研究前，应要求其合作的第三方对在联合研究中所获取的您的信息予以保密。
        </p>
        <p>
        <span style="font-size:13px;font-family:黑体;">2.5 为更好地为您提供服务，您理解并同意在您注册成为万融汇会员时，万融汇有权调取并保存您的手机位置信息、手机设备信息、通讯录、通话记录以及短信（包括但不限于短信内容、短信时间、发送对象等）。另外，为使最终提供贷款服务的机构能够更准确地评估您的资信，万融汇会将该等调取的信息发送给该机构，用于您本次贷款资信评估。 
    </p>
    <p>
    <span style="font-size:13px;font-family:黑体;">2.6 若您曾经已经登陆过万融汇，且已经授权万融汇完成了相应的信息获取事宜，当您再次登陆万融汇，并选择相关产品时，您授权万融汇自动将之前授权获取的您的信息推送给为您提供金融服务的机构。
    </p>
<p>
<span style="font-size:13px;font-family:黑体;">2.7 我们保证采用行业惯例以保护您的资料，但您理解，鉴于技术限制，我们无法确保用户的个人信息完全不被泄露。
</p>
<p>
<span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">2.8 我们不会向与您无关的第三方恶意出售或免费提供您的个人资料，但下列情况除外：
</p>
    <p>
        <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（1）事先获得您的明确授权；
        </p>
    <p>
        <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（2）按照相关司法机构或政府主管部门的要求；
        </p>
    <p>
        <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（3）以维护我们合法权益之目的； 
        </p>
    <p>
        <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（4）维护社会公众利益；
        </p>
        <p>
        <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（5）为了确保万融汇业务和系统的完整与操作。
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">（6）符合其他合法要求。
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">三、使用准则
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">3.1 您在使用万融汇服务过程中，必须遵循国家的相关法律法规，不通过万融汇发布、复制、上传、散播、分发、存储、创建或以其它方式公开含有以下内容的信息：
            </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（1）反对宪法所确定的基本原则的；  
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（3）损害国家荣誉和利益的；  
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（4）煽动民族仇恨、民族歧视，破坏民族团结的；  
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（5）破坏国家宗教政策，宣扬邪教和封建迷信的； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（6）散布谣言，扰乱社会秩序，破坏社会稳定的； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的、欺诈性的或以其它令人反感的讯息、数据、信息、文本、音乐、声音、照片、图形、代码或其它材料
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（8）侮辱或者诽谤他人，侵害他人合法权益的；  
        </p>   
        <p>
            <span style="font-size:13px;font-family:黑体;">（9）其他违反宪法和法律、行政法规或规章制度的；  
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（10）可能侵犯他人的专利、商标、商业秘密、版权或其它知识产权或专有权利的内容； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（11）假冒任何人或实体或以其它方式歪曲您与任何人或实体之关联性的内容； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（12）未经请求而擅自提供的促销信息、政治活动、广告或意见征集；
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（13）任何第三方的私人信息，包括但不限于地址、电话号码、电子邮件地址、身份证号以及信用卡卡号； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（14）病毒、不可靠数据或其它有害的、破坏性的或危害性的文件； 
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（15）与内容所在的互动区域的话题不相关的内容；  
        </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">（16）依我们的自行判断，足以令人反感的内容，或者限制或妨碍他人使用或享受互动区域或万融汇的内容，或者可能使我们或我们关联方或其他用户遭致任何类型损害或责任的内容；
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">（17）包含法律或行政法规禁止内容的其他内容。  
            </p> 
        <p>
            <span style="font-size:13px;font-family:黑体;">3.2 用户不得利用万融汇的服务从事下列危害互联网信息网络安全的活动： 
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">(1)未经允许，进入互联网信息网络或者使用互联网信息网络资源； <br/>
            (2)未经允许，对互联网信息网络功能进行删除、修改或者增加； <br/>
            (3)未经允许，对进入互联网信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；<br/> 
            (4)故意制作、传播计算机或手机病毒等破坏性程序；<br/>
            (5)其他危害互联网信息网络安全的行为。 <br/>
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">3.3 我们保留在任何时候为任何理由而不经通知地过滤、移除、筛查或编辑本平台上发布或存储的任何内容的权利，您须自行负责备份和替换在本平台发布或存储的任何内容，成本和费用自理。 
            </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">3.4 您须对自己在使用万融汇服务过程中的行为承担法律责任。若您为限制行为能力或无行为能力者，则您的法定监护人应承担相应的法律责任。 
            </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">3.5 如您的操作影响系统总体稳定性或完整性，我们将暂停或终止您的操作，直到相关问题得到解决。
            </p>
        <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">四、免责声明
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.1 万融汇是一个开放平台，用户将文章或照片等个人资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。作为网络服务的提供者，我们对用户在任何论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。您明确同意使用万融汇服务所存在的风险或产生的一切后果将完全由您自身承担，我们对上述风险或后果不承担任何责任。
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.2 您违反本注册协议、违反道德或法律的，侵犯他人权利（包括但不限于知识产权）的，我们不承担任何责任。同时，我们对任何第三方通过万融汇发送服务或包含在服务中的任何内容不承担责任。 
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.3 对您、其他用户或任何第三方发布、存储或上传的任何内容或由该等内容导致的任何损失或损害，我们不承担责任。 
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.5 对黑客行为、计算机或手机病毒、或因您保管疏忽致使帐号、密码被他人非法使用、盗用、篡改的或丢失，或由于与本平台链接的其它平台所造成您个人资料的泄露，或您因其他非万融汇原因造成的损失，我们不承担责任。如您发现任何非法使用用户帐号或安全漏洞的情况，请立即与我们联系。
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.6 因任何非万融汇原因造成的网络服务中断或其他缺陷，我们不承担任何责任。 

            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.7 我们不保证服务一定能满足您的要求；不保证服务不会中断，也不保证服务的及时性、安全性、准确性。
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.8 任何情况下，因使用万融汇而引起或与使用万融汇有关的而产生的由我们负担的责任总额，无论是基于合同、保证、侵权、产品责任、严格责任或其它理论，均不得超过您因访问或使用本平台而向我们支付的任何服务费用。

            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">4.9 万融汇提供免费的贷款搜索和推荐服务，贷款过程中遇到的任何预先收费均为诈骗行为，请保持警惕避免损失。
            </p>

        <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;text-decoration:underline">五、服务变更、中断或终止

        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">5.1 如因升级的需要而需暂停网络服务、或调整服务内容，我们将尽可能在平台上进行通告。由于用户未能及时浏览通告而造成的损失，我们不承担任何责任。 <br/>
            5.2 您明确同意，我们保留根据实际情况随时调整万融汇提供的服务内容、种类和形式，或自行决定授权第三方向您提供原本我们提供的服务。因业务调整给您或其他用户造成的损失，我们不承担任何责任。同时，我们保留随时变更、中断或终止万融汇全部或部分服务的权利。 <br/>
            5.3 发生下列任何一种情形，我们有权单方面中断或终止向您提供服务而无需通知您，且无需对您或第三方承担任何责任： <br/>
            （1）您提供的个人资料不真实； <br/>
            （2）您违反本服务条款；<br/>
            （3）未经我们书面同意，将万融汇平台用于商业目的。 <br/>
            5.4 您可随时通知我们终止向您提供服务或直接取消万融汇服务。自您终止或取消服务之日起，我们不再向您承担任何形式的责任。<br/>
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">六、知识产权及其它权利
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">6.1 用户可以充分利用万融汇平台共享信息。您可以在万融汇发布从万融汇个人主页或其他平台复制的图片和信息等内容，但这些内容必须属于公共领域或者您拥有以上述使用方式使用该等内容的权利，且您有权对该等内容作出本条款下之授权、同意、认可或承诺。 <br/>
            6.2 对您在万融汇发布或以其它方式传播的内容，您作如下声明和保证： <br/>
            （i）对于该等内容，您具有所有权或使用权； <br/>
            （ii）该等内容是合法的、真实的、准确的、非误导性的；<br/>
            （iii）使用和发布此等内容或以其它方式传播此等内容不违反本服务条款，也不侵犯任何人或实体的任何权利或造成对任何人或实体的伤害。 <br/>
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">6.3 未经相关内容权利人的事先书面同意，您不得擅自复制、传播在万融汇的该等内容，或将其用于任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算机或其他电子设备内。否则，我们及/或权利人将追究您的法律责任。 <br/>
            6.4 您在万融汇发布或传播的自有内容或具有使用权的内容，您特此同意如下： <br/>
            (1)授予我们使用、复制、修改、改编、翻译、传播、发表此等内容，从此等内容创建派生作品，以及在全世界范围内通过任何媒介（现在已知的或今后发明的）公开展示和表演此等内容的权利； <br/>
            (2)授予我们及其关联方和再许可人一项权利，可依他们的选择而使用用户有关此等内容而提交的名称；<br/>
            (3)授予我们在第三方侵犯您在万融汇的权益、或您发布在万融汇的内容情况下，依法追究其责任的权利（但这并非我们的义务）； <br/>
            6.5 您在万融汇公开发布或传播的内容、图片等为非保密信息，我们没有义务将此等信息作为您的保密信息对待。在不限制前述规定的前提下，我们保留以适当的方式使用内容的权利，包括但不限于删除、编辑、更改、不予采纳或拒绝发布。我们无义务就您提交的内容而向您付款。一旦内容已在万融汇发布，我们也不保证向您提供对在万融汇发布内容进行编辑、删除或作其它修改的机会。 <br/>
            6.6 如有权利人发现您在万融汇发表的内容侵犯其权利，并依相关法律、行政法规的规定向我们发出书面通知的，我们有权在不事先通知您的情况下自行移除相关内容，并依法保留相关数据。您同意不因该种移除行为向我们主张任何赔偿，如我们因此遭受任何损失，您应向赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。 <br/>
            6.7 若您认为您发布第6.6条指向内容并未侵犯其他方的权利，您可以向我们以书面方式说明被移除内容不侵犯其他方权利的书面通知，该书面通知应包含如下内容：您详细的身份证明、住址、联系方式、您认为被移除内容不侵犯其他方权利的证明、被移除内容在万融汇上的位置以及书面通知内容的真实性声明。我们收到该书面通知后，有权决定是否恢复被移除内容。 <br/>
            6.8 您特此同意，如果6.7条中的书面通知的陈述失实，您将承担由此造成的全部法律责任，如我们因此遭受任何损失，您应向赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。<br/>
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">七、特别约定
        </p>
        <p>
            <span style="font-size:13px;font-family:黑体;">7.1 您使用本服务的行为若有任何违反国家法律法规或侵犯任何第三方的合法权益的情形时，我们有权直接删除该等违反规定之信息，并可以暂停或终止向您提供服务。<br/>
            7.2 若您利用万融汇服务从事任何违法或侵权行为，由您自行承担全部责任，因此给我们或任何第三方造成任何损失，您应负责全额赔偿，并使我们免受由此产生的任何损害。  <br/>
            7.3 您同意我们通过重要页面的公告、通告、电子邮件以及常规信件的形式向您传送与万融汇服务有关的任何通知和通告。  <br/>
            7.4 如您有任何有关与万融汇服务的个人信息保护相关投诉，请您与我们联系，我们将在接到投诉之日起15日内进行答复。 <br/>
            7.5 本注册协议之效力、解释、执行均适用中华人民共和国法律。  <br/>
            7.6 若非万融汇更新本协议，您再确认同意、签署本协议后，其效力将及于您此时及未来登陆万融汇时所有操作。  <br/>
            7.7 您在本协议项下对本公司的授权将视为对本公司及本公司之关联公司的授权。本公司及本公司关联公司均可凭借您的授权及本协议约定执行相关操作。  <br/>
            7.8 如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，任何一方均可向陕西万福所在地的人民法院提起诉讼。  <br/>
            7.9 本注册协议中的标题仅为方便而设，不影响对于条款本身的解释。本注册协议最终解释权归陕西万福所有。<br/>
        </p>    
            `
        }else if(fromId == 3){
            //数据解析服务协议
            txtCon =`
            <p>
                <span style="font-size:13px;font-family:黑体;">本协议由陕西万福网络科技有限公司（以下简称“本公司”）和您签订。为明确用户在接受本公司服务过程中的权利义务，特制订本协议。您在通过本软件使用本公司提供的服务前，请仔细阅读以下的全部条款，一经点击“同意”或“勾选”后完成下一步操作，即视为您同意了本协议全部条款。所以，若您对本协议任何条款有异议的，请不要操作下一步或点击“同意”或“勾选”。
                </span>
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;font-weight:bold;">第一条 服务内容</span><br/>
                <span style="font-size:13px;font-family:黑体;">（一）本公司提供的数据解析服务（以下简称本服务）：指本公司在您授权的情况下，利用您留存的基本信息，向为您提供借款资信评审服务的机构提供关于您个人信息调取、查询、分析的相关服务以及本公司向您提供的其他服务。 
                基本信息是指为完成本公司提供的某项服务，所必须的信息。包括但不限于姓名、身份证号码、手机号、银行卡号、信息提供平台登录账号、密码等，具体基本信息种类以页面展示为准。 </span><br/>
                <span style="font-size:13px;font-family:黑体;">（二）本公司提供的数据解析服务种类如下： </span><br/>
               
                <span style="font-size:13px;font-family:黑体;">1.住房公积金查询服务，是指本公司在您授权的情况下，利用您留存的基本信息，从各地住房公积金官网获取您个人公积金信息的服务。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">2.社保查询服务，是指本公司在您授权的情况下，利用您留存的基本信息，从各地社保网上服务平台获取您社保信息的服务。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">3.手机使用情况查询服务，是指本公司在您授权的情况下，利用您留存的基本信息，从移动运营商处获取您手机使用情况的服务。 
                </span><br/>        
                <span style="font-size:13px;font-family:黑体;">4.征信查询服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录人行征信中心，最终获得您个人征信情况的服务。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">5.信用卡账单服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录对应银行信用卡平台获取您的信用卡账单，同时本公司还向您提供信用卡账单管理，还款提醒等服务。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">6.银行账户验证服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录对应银行网银平台获取您的银行账户信息及账户流水信息。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">7.淘宝账户数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您的淘宝账户，对您的淘宝账户进行查询。查询范围包括但不限于账户姓名、近期购物记录、收件人姓名及地址、信用额度和信用评价等。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">8.京东账户数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您的京东账户，对您的京东账户进行查询。查询范围包括但不限于账户姓名、近期购物记录、收件人姓名及地址、白条分等。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">9.支付宝账户数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您的支付宝账户，对您的支付宝账户进行查询以及为查询而必要的操作。查询范围包括但不限于账户姓名、近期购物记录、收件人姓名及地址、生活缴费记录、信用额度和信用评价等。  
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">10.学信网账户数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您的学信网账户，并对您的学信网账户信息进行查询、获取。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">11.邮箱数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您的邮箱，获取为您提供服务必要的邮件，包括但不限于银行对账单、电子账单、生活邮件等邮件、邮箱联系人、QQ群等信息。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">12.负面信息（黑名单）数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，向公开渠道查询关于您的负面信息。负面信息是指不利于对您借款审批通过的各类信息，包括但不限于借款逾期信息、被执行人失信人员信息等。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">13.网贷数据解析服务，是指本公司在您授权的情况下，利用您留存的基本信息，登录您所注册的网贷平台，获取您在该等网贷平台中的投资理财数据，并为您提供定期更新及展示上述数据的服务。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">14.定位信息解析服务，是指本公司在您授权的情况下，通过人工或自动程序获取您手机中的定位信息，并对该等信息留存、整理加工。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">15.通话记录解析服务，是指本公司在您授权的情况下，通过人工或自动程序获取您手机中目前留存的通话记录，并对该等信息留存、整理加工。  
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">16.短信记录解析服务，是指本公司在您授权的情况下，通过人工或自动程序获取您手机中目前留存的短信记录，并对该等信息留存、整理加工。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">17.通讯录解析服务，是指本公司在您授权的情况下，通过人工或自动程序获取您手机中目前留存的通讯录，并对该等信息留存、整理加工。                </span><br/>
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体;">（三）结合上述服务所输出的结果与其他因素，本公司将判断您的资信水平和相关风险，从而决定相关产品与您的交易条件或者其他相关的决策。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">（四）本公司承诺尽商业上的合理努力采用安全技术和程序保障用户信息安全，且上述技术和程序不低于国家法律法规的要求，以防信息的丢失、不当使用等情况的发生。 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">（五）为有效保障您使用本服务时的合法权益，您理解并同意接受以下规则： 
                </span><br/>
                <span style="font-size:13px;font-family:黑体;">1.本公司可能会以电话、电子邮件、短信、客户端通知等方式就某项服务的变更或增设对您进行通知，或提示您下一步的操作，但本公司不保证您能够收到或者及时收到该等通知，且不对此承担任何后果。 

                </span><br/>
                <span style="font-size:13px;font-family:黑体;">2.您同意并理解，基于运行和交易安全的需要，本公司可以暂时停止提供本服务的全部或部分功能，或提供新的功能，在任何服务功能减少、增加或者变化时，只要您仍然使用本功能，表示您仍然同意本协议或者变更后的协议。 
            </p>
            <p>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">第二条 授权条款</span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（一）您不可撤销地授权本公司可按照本协议载明的任一数据解析服务条款调取您的对应信息。</span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（二）您不可撤销地授权本公司利用您留存的基本信息，调取您在其他机构留存/生成的相关信息，同时对该等信息加以留存、分析、整理及加工。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（三）您不可撤销地授权本公司可将上述信息用于您的本次借款审批服务及其他关联服务（包括但不限于您注册本平台/APP时同意的《用户注册协议》第二条项下约定的用途）中。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（四）在为您提供服务的过程中，因某种原因导致本公司无法通过您留存的基本信息获取到完成借款审批服务必要的信息，您同意并授权本公司运用曾经（如有）为您提供服务时所留存的信息来完成本次服务。如果本公司留存的关于您的信息不足以支持本公司完成本次服务，本公司有权拒绝向您提供服务，并不承担由此给您造成的损失。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（五）上述条款中涉及的“采集、整理与加工”包括但不限于对用户信息的内容和/或形式进行重新排序、结构化、格式化、标准化等方法。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（六）为更好地为您提供服务，您同意并授权本公司可与其合作的第三方进行联合研究，并可将通过本协议获得的您的信息投入到该等联合研究中。但本公司与其合作的第三方在开展上述联合研究前，应要求其合作的第三方对在联合研究中所获取的您的信息予以保密。</span><br/>
            <span style="font-size:13px;font-family:黑体;text-decoration:underline;font-weight:bold;">（七）您在本协议项下对本公司的授权将视为对本公司及本公司之关联公司的授权。本公司及本公司关联公司均可凭借您的授权及本协议约定执行相关操作。另外，在签署保密协议的情况下，您在本协议中的相关授权可延伸到本公司指定的第三方公司。
            第三条 您的权利与义务</span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第三条 您的权利与义务     </span><br/>
            <span style="font-size:13px;font-family:黑体;">（一）您必须为年满18岁并具有完全民事行为能力的自然人。 </span><br/>
            <span style="font-size:13px;font-family:黑体;">（二）您点击“同意”或“勾选”，即视为同意本协议全部内容，本公司亦即视为该等操作是证明、声明和保证您为接受服务的主体，并应遵守本协议的相关规定。 </span><br/>
            <span style="font-size:13px;font-family:黑体;">（三）您只能通过本公司软件获取自己的信息，不得在他人未知情的情况下获取他人的信息。  </span><br/>
            <span style="font-size:13px;font-family:黑体;">（四）您应妥善保管好登录本公司软件的账户名、密码等信息，并对以您名义进行的申请、查询等所有操作行为承担所有法律责任。  </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">（五）您应妥善保管本人信息，包括并不限于用户名、账号、手机号码、密码、验证码。如因您本人保管个人信息不善，或因您不慎登录“钓鱼”平台、互联网邮箱系统出现安全问题，导致他人获得您的个人信息，或因此导致个人信息被他人取得可能导致用户遭受损失的后果由您自行承担。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;">（六）查询获得的信息仅供本公司审批您的借款申请。查询相关信息的数据来源均为第三方服务提供商，如有与第三方服务提供商所提供的信息存在差异，应以第三方服务提供商信息为准。您不应将其作为针对本手机客户端任何投诉、起诉、要求或者其他法律程序的依据。  </span><br/>
            <span style="font-size:13px;font-family:黑体;">（七）您不得传送任何包含病毒、木马、蠕虫等可能破坏、感染、密码拦截任何系统，数据和信息的程序，不得通过黑客、密码破译等方式违法侵入计算机和网络系统，他人账户。  </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第四条 不可抗力条款 </span><br/>            
            <span style="font-size:13px;font-family:黑体;"> 因台风、地震、海啸、洪水、战争、计算机病毒感染、黑客攻击、网络通信故障等不能预见、不能控制的不可抗力因素，造成本公司不能正常向您提供服务而可能导致的损失，本公司不承担责任。 </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第五条 特殊情形</span><br/> 
            <span style="font-size:13px;font-family:黑体;">您理解并同意，鉴于网络服务的特殊性，信息来源提供方随时可能变更、暂停、中止或者终止部分或全部的查询服务。本协议中的相关条款根据该变更而自动做相应修改，双方无须另行签订协议，本公司也无需就上述服务的变更、暂停、中止或者终止向您承担任何责任。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;">本协议可在您接受本公司提供服务的过程中多次使用，未来为您提供服务时再次涉及到本协议服务内容时无需您另行签署。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第六条 知识产权
            </span><br/> 
            <span style="font-size:13px;font-family:黑体;">本公司是提供信息服务的第三方，与本软件相关的任何内容和资源（包括但不限于文字、图案、图表、色彩、动画、声音、页面设计）的知识产权均属于本公司所有，受《著作权法》、《商标法》《专利法》、《反不正当竞争法》及其他相关法律法规的保护。未经本公司书面明确许可，任何单位和个人不得以任何方式将平台之内容和相关资源作全部或部分复制、转载、引用、编辑和建立本手机客户端的镜像。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第七条 网络传输风险 </span><br/>
            <span style="font-size:13px;font-family:黑体;">您理解并同意，由于本协议所列服务涉及个人隐私，通过网络提供和传输存在特定的泄密风险，用户一经充分考虑到该风险，并愿意承担该风险通过网络的方式完成本项服务，如果因网络传输导致个人隐私泄露等后果，将由用户自行承担。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第八条 法律适用条款以及争议解决方式 </span><br/>
            <span style="font-size:13px;font-family:黑体;">本协议的解释、履行及争议的解决均适用中华人民共和国法律。在协议履行期间，凡由本协议引起的或与本协议有关的一切争议、纠纷，当事人应首先协商解决。协商不成，可向本公司所在地法院提起诉讼。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;font-weight:bold;">第九条 附则
            </span><br/>

            <span style="font-size:13px;font-family:黑体;">（一）若本协议中的任何条文无论因何种原因完全或部分无效或不具有执行力，本协议的其他条款仍继续有效。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;">（二）本协议未尽事宜，根据我国相关法律、法规、各信息提供方相关业务规定及您注册本平台/APP时同意的《用户注册协议》办理。如需制定补充协议，其法律效力同本协议。  </span><br/>
            <span style="font-size:13px;font-family:黑体;">（三）若非本公司更新本协议，您再确认同意、签署本协议后，其效力将及于您此时及未来所有操作。
            </span><br/>
            <span style="font-size:13px;font-family:黑体;">（四）本协议将使用电子签署的方式完成签署，自您点击“同意”或“勾选”并进行下一步操作后则协议生效。 </span><br/>               
            </p>
        `
        }else if(fromId == 4){
            //个人信息使用授权
            txtCon = `<p>
            <span style="font-size:13px;font-family:黑体">您同意并确认： </span>
        </p>
            <p>
                <span style="font-size:13px;font-family:黑体">1、您同意并授权陕西万福网络科技有限公司（或其委托或合作的第三方）在您申请借款、审批及贷后管理期间，通过查询服务提供机构向包含但不限于中国人民银行征信中心及其分支机构以及其他信息服务机构查询并获取您的个人信息（包括但不限于身份信息、联系方式、工作信息、银行卡交易信息、银行贷款相关信息、网络交易信息、逾期信息及其他信息等）【您已经充分理解并知晓该等信息被提供和使用的风险，包括但不限于：上述信息对您的信用评价、以及分析报告等结果产生不利影响的风险；该等信息被查询服务提供机构依法提供给陕西万福网络科技有限公司（或其委托或合作的第三方）后可能被第三方不当利用的风险；以及基于您的特定信用状况可能被不良信息骚扰的风险等。】，以了解您资信状况。对于在上述机构所获得的您信息仅在此笔贷款业务的贷前审核和贷后管理（贷款人向借款人发放贷款后直至该笔贷款结清时止的业务管理，包括但不限于贷后回访、还款监测、逾期催收等）中使用。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">2、您同意并授权包括但不限于中国人民银行征信中心及其分支机构以及其他信息服务机构可将其拥有的您信息通过查询服务提供机构提供给陕西万福网络科技有限公司（或其委托或合作的第三方）。同时，为更好、更完整地展现您的资信情况，您同意并授权查询服务提供机构及其关联公司及其指定的第三方可留存、整理及加工本次获取的您信息用于查询服务提供机构及其关联公司及其指定的第三方为您提供的其他服务中。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">3、您同意并授权，查询服务提供机构可将其合法获取的您的信息经过整合、加工并转化为信息评分或信息报告回传给陕西万福网络科技有限公司（或其委托或合作的第三方），用于您申请借款、审批及贷后管理等事项。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">4、您同意并授权陕西万福网络科技有限公司（或其委托或合作的第三方）通过查询服务提供机构向包括但不限于中国人民银行征信中心及其分支机构以及其他信息服务机构上传您在本次借款过程生成的资信信息。同时，您同意并授权包括但不限于中国人民银行征信中心及其分支机构以及其他信息服务机构接收陕西万福网络科技有限公司（或其委托或合作的第三方）通过查询服务提供机构上传的您在本次借款过程生成的资信信息。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">5、 为更好地为您提供服务，您同意并授权查询服务机构可与其合作的第三方进行联合研究，并可将通过本授权书获得的您的信息投入到该等联合研究中。但查询服务机构与其合作的第三方在开展上述联合研究前，应要求其合作的第三方对在联合研究中所获取的您的信息予以保密。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">6、本授权书可在您接受陕西万福网络科技有限公司（或其委托或合作的第三方）提供服务（包括贷前审核和贷后管理）的过程中多次使用，陕西万福网络科技有限公司（或其委托或合作的第三方）及查询服务提供机构自您签署本授权之日起可多次依据本授权书而操作执行本授权书项下的活动无需您另行授权。 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">7、您确认已充分被告知、了解并接受上述授权的法律后果。
            </p>
            `
        }else if(fromId == 5){//投保规则
            txtCon=`
            <p>
                <span style="font-size:13px;font-family:黑体">1、投保规定：本保险身故受益人为法定受益人。本保险的保险对象为22-50周岁身体健康、能正常工作或正常生活的自然人。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">2、保险限制：每位客户受赠保险以1份为限。根据监管新规，大都会保险投保人、被保人是外国政要或国际组织高级管理人员不得承保免费保险。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">3、保险期限：本保险的保障期限为以保障详情为准，以保单载明的保险起止日期为准。对保险起止日期外所发生的保险事故本公司不承担保险金责任。 
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">4、告知义务：依据我国《保险法》规定，投保人、被保险人应如实告知，否则保险人有权依法解除保险合同，并对于保险合同解除前发生的保险事故不负任何责任。投保人、被保险人在投保时，应对投保书内各项内容如实详细地说明或填写清楚。否则，保险人有权依法解除保险合同。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">5、保险凭证：本保险仅提供电子保单，仅限赠送。保单生效后客户会自动收到短信通知，请将短信保存并将短信上的电子保单号记录在适当的位置，以方便查询及理赔。您也可以通过所获赠险相应保险公司官方平台查询您的保单信息。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">6、赠险赞助商：相关赠险由相应保险公司友情赞助。为保证服务质量后续可能会接到保险代理人的电话落实赠险生效事宜。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">7、保险金申请：发生保险事故后，请被保险人或受益人及时凭电子保险单号及身份信息向保险公司报案，并提供相关证明和资料，保险公司将尽快按照有关条款履行给付责任。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">8、本保险不接受撤保、退保、加保及被保险人更换，相关赠险仅限本人领取。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">9、如对本活动有疑问和建议请拨打【400-960-9190】进行咨询(咨询时间:工作日9:30至17:30); 如对赠险内容及理赔有疑问请联系所获赠险的保险公司进行咨询(咨询时间:24小时)。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">10、本活动解释权归活动主办方所有。
            </p>
            `
        }else if(fromId == 6){//信息安全说明
            txtCon=`
            <p>
                <span style="font-size:13px;font-family:黑体">本人授权保险公司，除法律另有规定之外，将本人提供给保险公司的信息、享受保险公司服务产生的信息（包括本〔单证〕签署之前提供和产生的信息）以及保险公司根据本条约定查询、收集的信息，用于保险公司及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">本人授权保险公司，除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向保险公司因服务必要开展合作的伙伴提供、查询、收集本人的信息。为确保本人信息的安全，保险公司及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。
            </p>
            <p>
                <span style="font-size:13px;font-family:黑体">本条款自本〔单证〕签署时生效，具有独立法律效力 , 不受合同成立与否及效力状态变化的影响。
            </p>
            `
        }
        
        
        else{
            //申请贷款时，万融汇服务条款
            txtCon = `<p>
    <span style="font-size:13px;font-family:黑体"></span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">万融汇<span> APP</span>（以下简称“万融汇”）由陕西万福网络科技有限公司及其关联实体<span>(</span>以下简称“我们”或“陕西万福”<span>)</span>运营，我们依照以下注册协议向您提供本注册协议涉及的相关服务。请您使用万融汇服务前仔细阅读本注册协议。您只有完全同意所有注册协议，才能成为万融汇的用户（<span>&quot;</span>用户<span>&quot;</span>）并使用相应服务。您在注册为万融汇用户过程中点击<span>&quot;</span>同意万融汇用户注册协议<span>&quot;</span>按钮即表示您已仔细阅读并明确同意遵守本注册协议以及经参引而并入其中的所有条款、政策以及指南，并受该等规则的约束（合称<span>&quot;</span>本注册协议<span>&quot;</span>）。我们可能根据法律法规的要求或业务运营的需要，对本注册协议不时进行修改。除非另有规定，否则任何变更或修改将在修订内容于万融汇发布之时立即生效，您对万融汇的使用、继续使用将表明您接受此等变更或修改。如果您不同意本注册协议（包括我们可能不定时对其或其中引述的其他规则所进行的任何修改）的全部规定，则请勿使用万融汇提供的所有服务，或您可以主动取消万融汇提供的服务。</span>
</p>
<p>
    <span style="font-size: 13px;font-family: 黑体;border: none">为了便于您了解适用于您使用万融汇的条款和条件，我们将在万融汇上发布我们对本注册协议的修改，您应不时地审阅本注册协议以及经参引而并入其中的对应规则</span>
</p>
<p>
    <br/>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">一、服务内容</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">1.1</span><span style="font-size:13px;font-family:黑体">万融汇的具体服务内容由我们根据实际情况提供并不时更新，包括但不限于信息、图片、文章、评论、链接等，我们将定期或不定期根据用户的意愿以电子邮件、短信、电话或站内信等方式为用户提供活动信息，并向用户提供相应服务。我们对提供的服务拥有最终解释权。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">1.2</span><span style="font-size:13px;font-family:黑体">万融汇服务仅供个人用户使用。除我们书面同意，您或其他用户均不得将万融汇上的任何信息用于商业目的。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">1.3</span><span style="font-size:13px;font-family:黑体">您使用万融汇服务时所需的相关的设备以及网络资源等（如个人电脑及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均由您自行负担。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">二、信息提供和隐私保护</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.1</span><span style="font-size:13px;font-family:黑体">您在访问、使用万融汇或申请使用万融汇服务时，必须提供本人真实的个人信息，且您应该根据实际变动情况及时更新个人信息。保护用户隐私是我们的重点原则，我们通过各种技术手段和强化内部管理等办法提供隐私保护服务功能，充分保护您的个人信息安全</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.2</span><span style="font-size:13px;font-family:黑体">万融汇不负责审核您提供的个人信息的真实性、准确性或完整性，因信息不真实、不准确或不完整而引起的任何问题及其后果，由您自行承担，且您应保证万融汇免受由此而产生的任何损害或责任。若我们发现您提供的个人信息是虚假、不准确或不完整的，我们有权自行决定终止向您提供服务。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.3</span><span style="font-size:13px;font-family:黑体">您已明确授权，为提供服务、履行协议、解决争议、保障交易安全等目的，我们对您提供的、我们自行收集的及通过第三方收集的您的个人信息、您申请服务时的相关信息、您在使用服务时储存在万融汇的非公开内容以及您的其他个人资料（以下简称“个人资料”）享有留存、整理加工、使用和披露的权利，具体方式包括但不限于： </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>1</span>） 出于为您提供服务的需要在本<span>APP</span>公示您的个人资料；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>2</span>）由人工或自动程序对您的个人资料进行获取、评估、整理、存储；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>3</span>）使用您的个人资料以改进本<span>APP</span>的设计和推广；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>4</span>）使用您提供的联系方式与您联络并向您传递有关服务和管理方面的信息； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>5</span>）对您的个人资料进行分析整合并向为您提供服务的第三方提供为完成该项服务必要的信息。当为您提供服务的第三方与您电话核实信息时，为保证为您服务的质量，你同意万融汇对上述核实电话进行录音。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>6</span>）在您违反与我们或我们的其他用户签订的协议时，披露您的个人资料及违约事实，将您的违约信息写入黑名单并与必要的第三方共享数据，以供我们及第三方审核、追索之用。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>7</span>）其他必要的使用及披露您个人资料的情形。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">您已明确同意本条款不因您终止使用万融汇服务而失效。如因我们行使本条款项下权利使您遭受损失，我们对该等损失免责。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.4</span><span style="font-size:13px;font-family:黑体">为更好地为您提供服务，您同意并授权万融汇可与其合作的第三方进行联合研究，并可将通过本协议获得的您的信息投入到该等联合研究中。但万融汇与其合作的第三方在开展上述联合研究前，应要求其合作的第三方对在联合研究中所获取的您的信息予以保密。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.5</span><span style="font-size:13px;font-family:黑体">我们保证采用行业惯例以保护您的资料，但您理解，鉴于技术限制，我们无法确保用户的个人信息完全不被泄露。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">2.6</span><span style="font-size:13px;font-family:黑体">我们不会向与您无关的第三方恶意出售或免费提供您的个人资料，但下列情况除外：</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span><span style="font-size:13px;font-family:黑体">（<span>1</span>）事先获得您的明确授权； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>2</span>）按照相关司法机构或政府主管部门的要求；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>3</span>）以维护我们合法权益之目的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>4</span>）维护社会公众利益； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>5</span>）为确保万融汇业务和系统的完整与操作。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">（<span>6</span>）符合其他合法要求。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">三、使用准则</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">3.1</span><span style="font-size:13px;font-family:黑体">您在使用万融汇服务过程中，必须遵循国家的相关法律法规，不通过万融汇发布、复制、上传、散播、分发、存储、创建或以其它方式公开含有以下内容的信息： </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(1)</span><span style="font-size:13px;font-family:黑体">反对宪法所确定的基本原则的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(2)</span><span style="font-size:13px;font-family:黑体">危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(3)</span><span style="font-size:13px;font-family:黑体">损害国家荣誉和利益的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(4)</span><span style="font-size:13px;font-family:黑体">煽动民族仇恨、民族歧视，破坏民族团结的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(5)</span><span style="font-size:13px;font-family:黑体">破坏国家宗教政策，宣扬邪教和封建迷信的；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(6)</span><span style="font-size:13px;font-family:黑体">散布谣言，扰乱社会秩序，破坏社会稳定的；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(7)</span><span style="font-size:13px;font-family:黑体">散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的、欺诈性的或以其它令人反感的讯息、数据、信息、文本、音乐、声音、照片、图形、代码或其它材料； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(8)</span><span style="font-size:13px;font-family:黑体">侮辱或者诽谤他人，侵害他人合法权益的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(9)</span><span style="font-size:13px;font-family:黑体">其他违反宪法和法律、行政法规或规章制度的； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(10)</span><span style="font-size:13px;font-family:黑体">可能侵犯他人的专利、商标、商业秘密、版权或其它知识产权或专有权利的内容；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(11)</span><span style="font-size:13px;font-family:黑体">假冒任何人或实体或以其它方式歪曲您与任何人或实体之关联性的内容；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(12)</span><span style="font-size:13px;font-family:黑体">未经请求而擅自提供的促销信息、政治活动、广告或意见征集； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(13)</span><span style="font-size:13px;font-family:黑体">任何第三方的私人信息，包括但不限于地址、电话号码、电子邮件地址、身份证号以及信用卡卡号；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(14)</span><span style="font-size:13px;font-family:黑体">病毒、不可靠数据或其它有害的、破坏性的或危害性的文件；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(15)</span><span style="font-size:13px;font-family:黑体">与内容所在的互动区域的话题不相关的内容； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(16)</span><span style="font-size:13px;font-family:黑体">依我们的自行判断，足以令人反感的内容，或者限制或妨碍他人使用或享受互动区域或万融汇的内容，或者可能使我们或我们关联方或其他用户遭致任何类型损害或责任的内容； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(17)</span><span style="font-size:13px;font-family:黑体">包含法律或行政法规禁止内容的其他内容。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">3.2</span><span style="font-size:13px;font-family:黑体">用户不得利用万融汇的服务从事下列危害计算机信息网络安全的活动：</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(1)</span><span style="font-size:13px;font-family:黑体">未经允许，进入计算机信息网络或者使用计算机信息网络资源； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(2)</span><span style="font-size:13px;font-family:黑体">未经允许，对计算机信息网络功能进行删除、修改或者增加；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(3)</span><span style="font-size:13px;font-family:黑体">未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(4)</span><span style="font-size:13px;font-family:黑体">故意制作、传播计算机病毒等破坏性程序； </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(5)</span><span style="font-size:13px;font-family:黑体">其他危害计算机信息网络安全的行为。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">3.3</span><span style="font-size:13px;font-family:黑体">我们保留在任何时候为任何理由而不经通知地过滤、移除、筛查或编辑本<span>APP</span>上发布或存储的任何内容的权利，您须自行负责备份和替换在本<span>APP</span>发布或存储的任何内容，成本和费用自理。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">3.4</span><span style="font-size:13px;font-family:黑体">您须对自己在使用万融汇服务过程中的行为承担法律责任。若您为限制行为能力或无行为能力者，则您的法定监护人应承担相应的法律责任。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">3.5</span><span style="font-size:13px;font-family:黑体">如您的操作影响系统总体稳定性或完整性，我们将暂停或终止您的操作，直到相关问题得到解决。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">四、免责声明</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.1</span><span style="font-size:13px;font-family:黑体">万融汇是一个开放平台，用户将文章或照片等个人资料上传到互联网上，有可能会被其他组织或个人复制、转载、擅改或做其它非法用途，用户必须充分意识此类风险的存在。作为网络服务的提供者，我们对用户在任何论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。您明确同意使用万融汇服务所存在的风险或产生的一切后果将完全由您自身承担，我们对上述风险或后果不承担任何责任。 </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.2</span><span style="font-size:13px;font-family:黑体">您违反本注册协议、违反道德或法律的，侵犯他人权利（包括但不限于知识产权）的，我们不承担任何责任。同时，我们对任何第三方通过万融汇发送服务或包含在服务中的任何内容不承担责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.3</span><span style="font-size:13px;font-family:黑体">对您、其他用户或任何第三方发布、存储或上传的任何内容或由该等内容导致的任何损失或损害，我们不承担责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.4</span><span style="font-size:13px;font-family:黑体">对任何第三方通过万融汇可能对您造成的任何错误、中伤、诽谤、诬蔑、不作为、谬误、淫秽、色情或亵渎，我们不承担责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.5</span><span style="font-size:13px;font-family:黑体">对黑客行为、计算机或手机病毒、或因您保管疏忽致使帐号、密码被他人非法使用、盗用、篡改的或丢失，或由于与本<span>APP</span>站链接的其它网站或<span>APP</span>所造成您个人资料的泄露，或您因其他非万融汇原因造成的损失，我们不承担责任。如您发现任何非法使用用户帐号或安全漏洞的情况，请立即与我们联系。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.6</span><span style="font-size:13px;font-family:黑体">因任何非万融汇原因造成的网络服务中断或其他缺陷，我们不承担任何责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.7</span><span style="font-size:13px;font-family:黑体">我们不保证服务一定能满足您的要求；不保证服务不会中断，也不保证服务的及时性、安全性、准确性。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.8</span><span style="font-size:13px;font-family:黑体">任何情况下，因使用万融汇而引起或与使用万融汇有关而产生的由我们负担的责任总额，无论是基于合同、保证、侵权、产品责任、严格责任或其它理论，均不得超过您因访问或使用本<span>APP</span>而向我们支付的任何服务费用。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">4.9</span><span style="font-size:13px;font-family:黑体">万融汇提供免费的贷款搜索和推荐服务，贷款过程中遇到的任何预先收费均为诈骗行为，请保持警惕避免损失。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">五、服务变更、中断或终止</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">5.1</span><span style="font-size:13px;font-family:黑体">如因升级的需要而需暂停服务、或调整服务内容，我们将尽可能在<span>APP</span>上进行通告。由于用户未能及时浏览通告而造成的损失，我们不承担任何责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">5.2</span><span style="font-size:13px;font-family:黑体">您明确同意，我们保留根据实际情况随时调整万融汇提供的服务内容、种类和形式，或自行决定授权第三方向您提供原本我们提供的服务。因业务调整给您或其他用户造成的损失，我们不承担任何责任。同时，我们保留随时变更、中断或终止万融汇全部或部分服务的权利。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">5.3</span><span style="font-size:13px;font-family:黑体">发生下列任何一种情形，我们有权单方面中断或终止向您提供服务而无需通知您，且无需对您或第三方承担任何责任：</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;&nbsp; (1)</span><span style="font-size:13px;font-family:黑体">您提供的个人资料不真实；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;&nbsp; (2)</span><span style="font-size:13px;font-family:黑体">您违反本注册协议；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp; (3)</span><span style="font-size:13px;font-family:黑体">未经我们书面同意，将万融汇平台用于商业目的。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">5.4</span><span style="font-size:13px;font-family:黑体">您可随时通知我们终止向您提供服务或直接取消万融汇服务。自您终止或取消服务之日起，我们不再向您承担任何形式的责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">六、知识产权及其它权利</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.1</span><span style="font-size:13px;font-family:黑体">用户可以充分利用万融汇平台共享信息。您可以在万融汇发布从万融汇个人主页或<span>APP</span>或其他网站或<span>APP</span>复制的图片和信息等内容，但这些内容必须属于公共领域或者您拥有以上述使用方式使用该等内容的权利，且您有权对该等内容作出本条款下之授权、同意、认可或承诺。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.2</span><span style="font-size:13px;font-family:黑体">对您在万融汇发布或以其它方式传播的内容，您作如下声明和保证：</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(i)</span><span style="font-size:13px;font-family:黑体">对于该等内容，您具有所有权或使用权；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp; (ii)</span><span style="font-size:13px;font-family:黑体">该等内容是合法的、真实的、准确的、非误导性的；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp; (iii)</span><span style="font-size:13px;font-family:黑体">使用和发布此等内容或以其它方式传播此等内容不违反本注册协议，也不侵犯任何人或实体的任何权利或造成对任何人或实体的伤害。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.3</span><span style="font-size:13px;font-family:黑体">未经相关内容权利人的事先书面同意，您不得擅自复制、传播在万融汇的该等内容，或将其用于任何商业目的，所有这些资料或资料的任何部分仅可作为个人或非商业用途而保存在某台计算机或其他电子设备内。否则，我们及<span>/</span>或权利人将追究您的法律责任。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.4</span><span style="font-size:13px;font-family:黑体">您在万融汇发布或传播的自有内容或具有使用权的内容，您特此同意如下： </span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">(1)</span><span style="font-size:13px;font-family:黑体">授予我们使用、复制、修改、改编、翻译、传播、发表此等内容，从此等内容创建派生作品，以及在全世界范围内通过任何媒介（现在已知的或今后发明的）公开展示和表演此等内容的权利；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp; (2)</span><span style="font-size:13px;font-family:黑体">授予我们及其关联方和再许可人一项权利，可依他们的选择而使用用户有关此等内容而提交的名称；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">&nbsp;&nbsp; (3)</span><span style="font-size:13px;font-family:黑体">授予我们在第三方侵犯您在万融汇的权益、或您发布在万融汇的内容情况下，依法追究其责任的权利（但这并非我们的义务）；</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.5</span><span style="font-size:13px;font-family:黑体">您在万融汇公开发布或传播的内容、图片等为非保密信息，我们没有义务将此等信息作为您的保密信息对待。在不限制前述规定的前提下，我们保留以适当的方式使用内容的权利，包括但不限于删除、编辑、更改、不予采纳或拒绝发布。我们无义务就您提交的内容而向您付款。一旦内容已在万融汇发布，我们也不保证向您提供对在万融汇发布内容进行编辑、删除或作其它修改的机会。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.6</span><span style="font-size:13px;font-family:黑体">如有权利人发现您在万融汇发表的内容侵犯其权利，并依相关法律、行政法规的规定向我们发出书面通知的，我们有权在不事先通知您的情况下自行移除相关内容，并依法保留相关数据。您同意不因该种移除行为向我们主张任何赔偿，如我们因此遭受任何损失，您应向赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.7</span><span style="font-size:13px;font-family:黑体">若您认为您发布第<span>6.6</span>条指向内容并未侵犯其他方的权利，您可以向我们以书面方式说明被移除内容不侵犯其他方权利的书面通知，该书面通知应包含如下内容：您详细的身份证明、住址、联系方式、您认为被移除内容不侵犯其他方权利的证明、被移除内容在万融汇上的位置以及书面通知内容的真实性声明。我们收到该书面通知后，有权决定是否恢复被移除内容。</span>
</p>
<p>
    <span style="font-size:13px;font-family:黑体">6.8</span><span style="font-size:13px;font-family:黑体">您特此同意，如果<span>6.7</span>条中的书面通知的陈述失实，您将承担由此造成的全部法律责任，如我们因此遭受任何损失，您应向赔偿我们的损失（包括但不限于赔偿各种费用及律师费）。</span>
</p>
<p>
    <br/>
</p>`
        }



        /*	switch (fromId){
                case 1://设置，关于万融汇
                txtCon=`万融汇，贷款业务涵盖个人消费贷、经营贷、房贷、车贷。平台整理归类了各类金融产品名同事收集了各类产品的详细信息和风控规则，提供给了用户高质量，精准的金融产品服务。用户通过万融汇独有的智能匹配系统，可一站式比较数万款贷款产品，筛选产品并直接提交申请。对银行而言，则是批量获取优质客户的营销渠道；同时，万融汇优秀的风控系统，能辅助银行，贷款方过滤信用较低，历史还款记录较差或高风险用户，为资方的安全保驾护航。`;
                    break;
                case 2:
                    break;
                case 3://登录，万融汇协议
            	
                    break;	
                default:
                    break;
            }*/
        return (
            <div className="txt app_Box">
                {/* <Header title={title} /> */}
                <div className="header">
                    <div className="toBack" onClick={this.back}>
                        <img src="src/img/icon/back3.png" />
                    </div>
                    <p className="title">{title}</p>
                    <div className="headerLinkBtn"></div>
                </div>
                <div className="content txtCon" dangerouslySetInnerHTML={{ __html: txtCon }}>
                </div>

            </div>
        )
    }

});


export default Txt;


