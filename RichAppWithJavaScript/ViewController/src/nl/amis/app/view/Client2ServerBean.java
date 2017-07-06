package nl.amis.app.view;

import java.util.Date;

import java.util.HashMap;
import java.util.Map;

import javax.faces.context.FacesContext;

import oracle.adf.view.rich.component.rich.input.RichInputText;
import oracle.adf.view.rich.component.rich.output.RichOutputText;
import oracle.adf.view.rich.context.AdfFacesContext;
import oracle.adf.view.rich.render.ClientEvent;

import org.apache.myfaces.trinidad.component.UIXComponentBase;
import org.apache.myfaces.trinidad.render.ExtendedRenderKitService;
import org.apache.myfaces.trinidad.util.ComponentReference;
import org.apache.myfaces.trinidad.util.Service;

public class Client2ServerBean {
    private String answer1;
    private String answer2;
    private String question1;
private Map<String,String> capitals = new HashMap();
    public Client2ServerBean() {
        super();
        capitals.put("uk","London");
        capitals.put("france","Paris");
        capitals.put("spain","Madrid");
        capitals.put("germany","Berlin");
        capitals.put("belgium","Brussels");
        capitals.put("netherlands","Amsterdam");
        capitals.put("portugal","Lisbon");
        capitals.put("italy","Rome");
    }
    public Date getTime() {
        return new java.util.Date();
    }

    // this method is called from the serverListener in client-to-server.jsf; it receives an event with a payload that contains a key helpTopic
    public void callForHelp(ClientEvent clientEvent) {
        // read helpTopic from attribute map passed in the client event
        String helpTopic = clientEvent.getParameters().get("helpTopic").toString();
        System.out.println("Show Help for helptopic = " + helpTopic);
    }

    // this method is triggered from a serverListener when the time needs to be refreshed
    public void refreshTime(ClientEvent clientEvent) {
        // all we need to do is add the timerfield component as Partial Target; it will be refrehsed, fetching the current value of getTime()
        AdfFacesContext adfctx = AdfFacesContext.getCurrentInstance();
        adfctx.addPartialTarget(getTimerField());
    }

    private ComponentReference a2Field;

    public RichInputText geta2Field() {
        if (a2Field != null) {
            return (RichInputText) a2Field.getComponent();
        }
        return null;
    }

    public void seta2Field(RichInputText a2Field) {
        this.a2Field = ComponentReference.newUIComponentReference(a2Field);
    }


    private ComponentReference timerField;

    public RichOutputText getTimerField() {
        if (timerField != null) {
            return (RichOutputText) timerField.getComponent();
        }
        return null;
    }

    public void setTimerField(RichOutputText timerField) {
        this.timerField = ComponentReference.newUIComponentReference(timerField);
    }
    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setQuestion1(String question1) {
        this.question1 = question1;
        setAnswer1(capitalForCountry(question1));
    }

    public String getQuestion1() {
        return question1;
    }

    private String capitalForCountry(String country) {
        String capital = capitals.get(country.toLowerCase());
        if (capital==null) {capital="Unknown";}
        // now pretend we make a call to some remote or backend service
        try {
            Thread.sleep(800);
        } catch (InterruptedException e) {
        }
        return capital;
    }

    // this method is called from the serverListener in client-to-server.jsf; it receives an event with a payload that contains a key helpTopic
    public void chattyBot(ClientEvent clientEvent) {
        // receive name of country
        String country = clientEvent.getParameters().get("country").toString();
        System.out.println("Find capital for "+country);
        String capital = capitalForCountry(country);
        setAnswer2(capital);
        // now set the a2Field as partial target
        AdfFacesContext adfctx = AdfFacesContext.getCurrentInstance();
        adfctx.addPartialTarget(geta2Field());
        
        // publish answer to JavaScript function
        // publish event newBackgroundColorEvent to client event bus with the newly selected color in the payload
        FacesContext context = FacesContext.getCurrentInstance();
        ExtendedRenderKitService erks =
        Service.getService(context.getRenderKit(),
               ExtendedRenderKitService.class);
        String script = "publishAnswer('{\"question\":\""+country+"\",\"answer\":\""+capital +"\"}');";
        System.out.println("Javascript to execute"+script);
        erks.addScript(context, script);
    }


    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    public String getAnswer2() {
        return answer2;
    }
}
