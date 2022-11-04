const ExtensionUtils = imports.misc.extensionUtils
const Me = ExtensionUtils.getCurrentExtension()
const { Adw, GObject } = imports.gi

const {
    baseGTypeName,
    makeRow,
    makeSwitch
} = Me.imports.libs.prefItems

var notificationsPage = GObject.registerClass({
    GTypeName: baseGTypeName+'notificationsPage',
}, class notificationsPage extends Adw.PreferencesPage {
    filterListData = []
    filteredAppsGroup
    settings
    addFilteredAppButtonRow

    constructor(settings) {
        // group config
        super({
            name: 'notifications',
            title: 'Notifications',
            iconName: 'user-available-symbolic'
        })

        // description / enable
        const descriptionGroup = new Adw.PreferencesGroup()
        makeRow({
            parent: descriptionGroup,
            title: "Add notifications widget",
            subtitle: "Reference from https://github.com/Aylur/gnome-extensions"
        })
        makeSwitch({
            parent: descriptionGroup,
            title: "Visible",
            subtitle: "Turn on to make the notification widget visible on the Quick Settings panel",
            value: settings.get_boolean("notifications-enabled"),
            bind: [settings, "notifications-enabled"]
        })
        this.add(descriptionGroup)

        // general
        const generalGroup = new Adw.PreferencesGroup({ title: "General" })
        this.add(generalGroup)
        makeSwitch({
            parent: generalGroup,
            title: "Attach to QS panel",
            value: settings.get_boolean("notifications-integrated"),
            subtitle: "Do not separate Quick Settings and Notifications widgets, \byou should enable this option because separated panels can make many visual bugs\n(such as margin or padding not matching with the theme)",
            bind: [settings, "notifications-integrated"]
        })
        makeSwitch({
            parent: generalGroup,
            title: "Put above QS Panel (Doesn't work with 'Attach to QS panel' enabled)",
            value: settings.get_boolean("notifications-move-to-top"),
            subtitle: "Put the Notifications widget above the Quick Settings one.\nThis feature could be useful if you use Dash to Panel",
            bind: [settings, "notifications-move-to-top"]
        })
    }
})