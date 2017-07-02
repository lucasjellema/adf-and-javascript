package nl.amis.app.view;

import java.util.Date;

import oracle.adf.view.rich.component.rich.output.RichOutputText;
import oracle.adf.view.rich.context.AdfFacesContext;
import oracle.adf.view.rich.render.ClientEvent;

import org.apache.myfaces.trinidad.component.UIXComponentBase;
import org.apache.myfaces.trinidad.util.ComponentReference;

public class Client2ServerBean {
    private RichOutputText timer;

    public Client2ServerBean() {
        super();
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
}
