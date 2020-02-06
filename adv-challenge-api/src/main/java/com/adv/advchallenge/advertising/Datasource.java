package com.adv.advchallenge.advertising;

import java.io.Serializable;

public class Datasource implements Serializable {

    private String text;

    public Datasource(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
