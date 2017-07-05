package nl.amis.app.view;

import java.util.Date;

import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;

public class TargetBean {

    private String greeting;
    private String name;
    private Date date;

    public void nameChanged(ValueChangeEvent valueChangeEvent) {
        String name = (String) valueChangeEvent.getNewValue();  
        String greeting = getPreferredGreeting(name);
        System.out.println("Set greeting for new name "+name+" to : "+greeting);
        setGreeting(greeting);
    }

    public void reset(ActionEvent event) {
        setName(null);
        setDate(null);
        setGreeting(null);
    }

    private String getPreferredGreeting(String name) {
        return "Bonjour " + (name==null?"dummy":name);
    }

    public void setGreeting(String newgreeting) {
        this.greeting = newgreeting;
    }

    public String getGreeting() {
        return this.greeting+ " at "+new java.util.Date();
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }



    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }
}
