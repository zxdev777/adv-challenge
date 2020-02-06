package com.adv.advchallenge.advertising;

import java.io.Serializable;

public class Campaign implements Serializable {

    private String text;

    public Campaign(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
