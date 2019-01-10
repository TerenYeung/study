var Event = (function() {
    var global = this,
        Event,
        _default = 'default';

    Event = function() {
        var _create, ret, namespaceCache = {}

        ret = {
            one: function() {},
            listen: function() {},
            remove: function() {},
            trigger: function() {},
        }

        _create = function(namespace) {
            return namespace
                ? (namespaceCache[namespace])
                    ? (namespaceCache[namespace])
                    : (namespaceCache[namespace]) = ret
                : ret
        }

        return {
            create: _create,
            one: function() {},
            remove: function() {},
            listen: function() {},
            trigger: function() {}
        }
    }()

    return Event
})()