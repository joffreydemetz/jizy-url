const jPackData = {
    name: 'jUrl',
    alias: 'jizy-url',
    cfg: 'url',
    assetsPath: 'dist',

    buildTarget: null,
    buildZip: false,
    buildName: 'default',

    desktopBreakpoint: '900px',

    onCheckConfig: () => { },

    onGenerateBuildJs: (code) => code,

    onGenerateWrappedJs: (wrapped) => wrapped,

    onPacked: () => { }
};

export default jPackData;