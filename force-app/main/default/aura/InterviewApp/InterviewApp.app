<aura:application access="global" extends="force:slds"> 
    <!-- ltng:outApp -->
    <aura:attribute name="contactId" type="String" />
    <aura:dependency resource="c:AppComponent"/>
    <c:AppComponent />
</aura:application>